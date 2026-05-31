import type { APIRoute } from "astro";
import {
  type Shaped,
  forwardToPortal,
  buildApproveUrl,
} from "../../lib/lead";

export const prerender = false;

/* ── Rate limiting (per-IP, in-memory) ───────────────────────── */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  rateLimitMap.set(ip, hits);
  return false;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, hits] of rateLimitMap) {
    const fresh = hits.filter((t) => now - t < RATE_WINDOW_MS);
    if (fresh.length === 0) rateLimitMap.delete(ip);
    else rateLimitMap.set(ip, fresh);
  }
}, RATE_WINDOW_MS);

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* ── Content spam scoring ─────────────────────────────────────────────
   The honeypot + timing trap catch dumb bots; these heuristics catch the
   JS-executing SEO-spam wave ("register your site in GoogleSearchIndex",
   "submit your site", links to searchregister.info, etc.).

   IMPORTANT: we no longer silently drop high-score submissions — that risked
   eating real leads. Instead, we always send the notification email and just
   prefix the subject with [POSSIBLY SPAM] and add a banner listing the
   reasons it was flagged, so the owner can review. The CRM webhook is still
   skipped for flagged submissions to keep the portal clean. */
const STRONG_SPAM_PATTERNS: RegExp[] = [
  /google\s*search\s*index/i,
  /search\s*register/i,
  /\bsearchregister\b/i,
  /appear\s+in\s+(?:web\s+)?search/i,
  /(?:submit|list|index|register|rank)\s+(?:your\s+)?(?:site|website|url|business|domain)/i,
  /search\s+engine\s+(?:results|ranking|optimization|index)/i,
  /(?:back ?links?|link\s*building)/i,
  /first\s+page\s+of\s+google/i,
  /\b(?:viagra|cialis|casino|crypto|bitcoin|forex|porn|escort)\b/i,
];
const URL_RE =
  /\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(?:info|xyz|top|click|online|site|biz|shop|live|cyou|sbs)\b/gi;

type SpamResult = { score: number; reasons: string[] };

function spamScore(d: Shaped, allServicesCount: number): SpamResult {
  const text = `${d.name} ${d.businessName} ${d.industry} ${d.description} ${d.message}`;
  let score = 0;
  const reasons: string[] = [];

  for (const re of STRONG_SPAM_PATTERNS) {
    if (re.test(text)) {
      score += 3;
      reasons.push(`Matched spam phrase: ${re}`);
    }
  }

  const urls = d.message.match(URL_RE) ?? [];
  if (urls.length) {
    const add = Math.min(urls.length, 3);
    score += add;
    reasons.push(`URLs in message (${urls.length}, +${add}): ${urls.slice(0, 3).join(", ")}`);
  }

  // A lookalike sender domain (search-elefoxstudio.com, etc.) impersonating us.
  if (
    /elefox/i.test(d.email.split("@")[1] ?? "") &&
    !/@elefoxstudio\.com$/i.test(d.email)
  ) {
    score += 2;
    reasons.push(`Lookalike sender domain (+2): ${d.email}`);
  }

  // "Everything + cheapest + ASAP" with no real description is a bot fingerprint.
  if (allServicesCount >= 5 && !d.description) {
    score += 1;
    reasons.push("All services selected + no description (+1)");
  }

  return { score, reasons };
}

const SERVICE_LABELS: Record<string, string> = {
  crm: "Custom CRM",
  software: "Custom software",
  websites: "Websites",
  brand: "Brand & marketing",
  ai: "AI & automation",
  other: "Not sure yet",
};

/* ── Cloudflare Turnstile verification ────────────────────────────────
   When TURNSTILE_SECRET_KEY is set, the token from the widget is verified
   against Cloudflare. If the secret is unset (e.g. local dev), verification
   is skipped so the form still works. */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured -> skip
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.append("remoteip", ip);
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (data.success !== true) {
      console.warn(
        "[api/contact] Turnstile verify rejected:",
        JSON.stringify(data["error-codes"] ?? data),
      );
    }
    return data.success === true;
  } catch (err) {
    console.error("[api/contact] Turnstile verify failed:", err);
    return false;
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function buildEmailHtml(d: Shaped, spam?: SpamResult): string {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const row = (label: string, value: string) => {
    const v = value.trim()
      ? `<span style="color:#1a1f1b;white-space:pre-wrap">${escHtml(value)}</span>`
      : '<span style="color:#9b9890;font-style:italic">(not provided)</span>';
    return `<tr><td style="padding:10px 0;vertical-align:top;color:#6b7280;width:35%;font-size:13px">${label}</td><td style="padding:10px 0;vertical-align:top;font-size:14px">${v}</td></tr>`;
  };

  const flagged = !!spam && spam.score >= 3;
  const approveUrl = flagged ? buildApproveUrl(d) : "";
  const approveButton = approveUrl
    ? `<div style="margin-top:14px"><a href="${approveUrl}" style="display:inline-block;background:#3F5A2E;color:#F7F4ED;text-decoration:none;font-weight:600;padding:9px 18px;border-radius:9999px;font-size:13px">Approve and push to CRM →</a></div>`
    : "";
  const banner = flagged
    ? `<div style="background:#fff4ec;border:1px solid #f0c8a6;border-left:4px solid #c8623a;padding:14px 16px;margin:0 0 20px;border-radius:8px;font-size:13px;color:#7a3a1a">
         <strong style="display:block;font-size:14px;margin-bottom:6px">⚠ Possibly spam (score ${spam!.score})</strong>
         <p style="margin:0 0 6px">This submission was flagged but is being delivered anyway so you can review it. The CRM lead was NOT created. If it's a real lead, click below to push it to the portal.</p>
         <ul style="margin:6px 0 0 18px;padding:0;font-size:12px;color:#7a3a1a;line-height:1.5">${spam!.reasons.map((r) => `<li>${escHtml(r)}</li>`).join("")}</ul>
         ${approveButton}
       </div>`
    : "";

  const title = flagged ? "Inquiry flagged as possible spam" : "New project inquiry";

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;max-width:680px;margin:0 auto;color:#1a1f1b;padding:0 16px">
      ${banner}
      <h1 style="margin:0 0 8px;font-size:24px;color:#1a1f1b">${title}</h1>
      <p style="margin:0 0 24px;color:#6b7280;font-size:14px">elefoxstudio.com contact form &middot; ${escHtml(submittedAt)} ET</p>
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", d.name)}
        ${row("Email", d.email)}
        ${row("Phone", d.phone)}
        ${row("Services", d.services)}
        ${row("Business name", d.businessName)}
        ${row("Industry", d.industry)}
        ${row("Description", d.description)}
        ${row("Budget", d.budget)}
        ${row("Timeline", d.timeline)}
        ${row("Message", d.message)}
      </table>
      <p style="margin:32px 0 0;font-size:11px;color:#9b9890;text-transform:uppercase;letter-spacing:0.1em">Sent via elefoxstudio.com</p>
    </div>
  `;
}

async function sendNotificationEmail(d: Shaped, spam?: SpamResult): Promise<void> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/contact] RESEND_API_KEY missing");
    throw new Error("Email not configured");
  }

  const from =
    import.meta.env.RESEND_FROM ?? "elefox studio <hello@elefoxstudio.com>";
  const to =
    import.meta.env.DISCOVERY_NOTIFY_EMAIL ??
    import.meta.env.REPLY_TO_EMAIL ??
    "hello@elefoxstudio.com";

  const servicesSuffix = d.services ? ` (${d.services})` : "";
  const flagged = !!spam && spam.score >= 3;
  const subject = flagged
    ? `[POSSIBLY SPAM, score ${spam!.score}] inquiry: ${d.name}${servicesSuffix}`
    : `New project inquiry: ${d.name}${servicesSuffix}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html: buildEmailHtml(d, spam),
      reply_to: d.email,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("[api/contact] Resend error:", err);
    throw new Error("Resend API error");
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return json({ ok: false, error: "Could not read form data." }, 400);
  }

  // Honeypot — silently succeed so bots don't learn they were caught.
  const hp = fd.get("_hp");
  if (typeof hp === "string" && hp.trim() !== "") {
    return json({ ok: true });
  }

  // Timing — humans take more than 3s to fill the form.
  const tRaw = fd.get("_t");
  const t = typeof tRaw === "string" ? Number(tRaw) : NaN;
  if (Number.isFinite(t) && Date.now() - t < 3000) {
    return json({ ok: true });
  }

  // Rate limit.
  let ip = "unknown";
  try {
    ip = clientAddress;
  } catch {
    const fwd = request.headers.get("x-forwarded-for");
    if (fwd) ip = fwd.split(",")[0].trim();
  }
  if (isRateLimited(ip)) {
    return json(
      { ok: false, error: "Too many submissions. Try again shortly." },
      429,
    );
  }

  // Cloudflare Turnstile. Verifies the human-challenge token (no-op if the
  // secret isn't configured).
  const turnstileToken = (() => {
    const v = fd.get("cf-turnstile-response");
    return typeof v === "string" ? v : "";
  })();
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return json(
      {
        ok: false,
        error: "Couldn't verify you're human. Please refresh and try again.",
      },
      403,
    );
  }

  const get = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  const name = get("name");
  const email = get("email");

  if (!name) return json({ ok: false, error: "Name is required." }, 400);
  if (!email || !isEmail(email))
    return json({ ok: false, error: "A valid email is required." }, 400);

  const serviceValues = fd
    .getAll("services")
    .filter((v): v is string => typeof v === "string");
  const services = serviceValues.map((v) => SERVICE_LABELS[v] ?? v).join(", ");

  const shaped: Shaped = {
    services,
    businessName: get("business_name"),
    industry: get("industry"),
    description: get("description"),
    budget: get("budget"),
    timeline: get("timeline"),
    name,
    email,
    phone: get("phone"),
    message: get("message"),
  };

  // Content spam scoring — we send the email regardless and flag in-subject
  // so a real lead never gets eaten. Only the CRM webhook is skipped for
  // suspected spam (you can manually create a portal lead if it's legit).
  const spam = spamScore(shaped, serviceValues.length);
  const flagged = spam.score >= 3;
  if (flagged) {
    console.warn(
      `[api/contact] flagged as possible spam (score ${spam.score}) from ${ip} <${shaped.email}>:`,
      spam.reasons.join(" | "),
    );
  }

  try {
    await sendNotificationEmail(shaped, spam);
  } catch (err) {
    console.error("[api/contact] send failed:", err);
    return json(
      { ok: false, error: "Something went wrong sending your note. Email hello@elefoxstudio.com directly?" },
      502,
    );
  }

  // CRM lead creation is best-effort; skip for flagged submissions.
  if (!flagged) forwardToPortal(shaped);

  return json({ ok: true });
};
