import type { APIRoute } from "astro";

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

const SERVICE_LABELS: Record<string, string> = {
  crm: "Custom CRM",
  software: "Custom software",
  websites: "Websites",
  brand: "Brand & marketing",
  ai: "AI & automation",
  other: "Not sure yet",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type Shaped = {
  services: string;
  businessName: string;
  industry: string;
  description: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  message: string;
};

function buildEmailHtml(d: Shaped): string {
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

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;max-width:680px;margin:0 auto;color:#1a1f1b;padding:0 16px">
      <h1 style="margin:0 0 8px;font-size:24px;color:#1a1f1b">New project inquiry</h1>
      <p style="margin:0 0 24px;color:#6b7280;font-size:14px">elefoxstudio.com contact form &middot; ${escHtml(submittedAt)} ET</p>
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", d.name)}
        ${row("Email", d.email)}
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

async function sendNotificationEmail(d: Shaped): Promise<void> {
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
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New project inquiry: ${d.name}${servicesSuffix}`,
      html: buildEmailHtml(d),
      reply_to: d.email,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("[api/contact] Resend error:", err);
    throw new Error("Resend API error");
  }
}

/* Fire-and-forget: also create a Lead row in the portal CRM. */
async function forwardToPortal(d: Shaped): Promise<void> {
  const url = import.meta.env.PORTAL_LEADS_WEBHOOK_URL;
  if (!url) return;
  const secret = import.meta.env.PORTAL_LEADS_WEBHOOK_SECRET;
  if (!secret) return; // portal fails closed without the shared secret

  const messageParts = [
    d.description && `Business: ${d.description}`,
    d.services && `Interested in: ${d.services}`,
    d.budget && `Budget: ${d.budget}`,
    d.timeline && `Timeline: ${d.timeline}`,
    d.message && `Notes: ${d.message}`,
  ].filter(Boolean);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-leads-secret": secret,
      },
      body: JSON.stringify({
        name: d.name,
        email: d.email,
        company: d.businessName || undefined,
        message: messageParts.join("\n") || undefined,
        source: "elefoxstudio-contact",
        _hp: "",
      }),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("[api/contact] Portal webhook error:", response.status, text);
    }
  } catch (err) {
    console.error("[api/contact] Portal webhook POST failed:", err);
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

  const get = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  const name = get("name");
  const email = get("email");

  if (!name) return json({ ok: false, error: "Name is required." }, 400);
  if (!email || !isEmail(email))
    return json({ ok: false, error: "A valid email is required." }, 400);

  const services = fd
    .getAll("services")
    .filter((v): v is string => typeof v === "string")
    .map((v) => SERVICE_LABELS[v] ?? v)
    .join(", ");

  const shaped: Shaped = {
    services,
    businessName: get("business_name"),
    industry: get("industry"),
    description: get("description"),
    budget: get("budget"),
    timeline: get("timeline"),
    name,
    email,
    message: get("message"),
  };

  try {
    await sendNotificationEmail(shaped);
  } catch (err) {
    console.error("[api/contact] send failed:", err);
    return json(
      { ok: false, error: "Something went wrong sending your note. Email hello@elefoxstudio.com directly?" },
      502,
    );
  }

  // CRM lead creation is best-effort; don't block the user on it.
  forwardToPortal(shaped);

  return json({ ok: true });
};
