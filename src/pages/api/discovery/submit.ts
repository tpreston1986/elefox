import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";
import { getForm } from "../../../data/discovery/forms";
import type {
  Field,
  FormDefinition,
  Section,
} from "../../../data/discovery/types";

export const prerender = false;

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;
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

type FieldResponse = {
  label: string;
  value: string;
  isEmpty: boolean;
};

type SectionResponse = {
  title: string;
  fields: FieldResponse[];
};

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function valueFor(field: Field, fd: FormData): string {
  if (field.type === "multiChoice") {
    const all = fd.getAll(field.name).filter((v): v is string => typeof v === "string");
    if (all.length === 0) return "";
    if ("choices" in field) {
      return all
        .map((v) => field.choices.find((c) => c.value === v)?.label ?? v)
        .join(", ");
    }
    return all.join(", ");
  }

  const raw = fd.get(field.name);
  if (typeof raw !== "string" || raw.trim() === "") return "";

  if (field.type === "singleChoice" && "choices" in field) {
    return field.choices.find((c) => c.value === raw)?.label ?? raw;
  }
  if (field.type === "yesNo") {
    return raw === "yes" ? "Yes" : raw === "no" ? "No" : raw;
  }
  if (field.type === "number" && "suffix" in field && field.suffix) {
    return `${raw} ${field.suffix}`;
  }
  return raw.trim();
}

function shapeResponses(form: FormDefinition, fd: FormData): SectionResponse[] {
  return form.sections.map((section: Section) => ({
    title: section.title,
    fields: section.fields.map((field) => {
      const v = valueFor(field, fd);
      return {
        label: field.label,
        value: v,
        isEmpty: v === "",
      };
    }),
  }));
}

function validateRequired(
  form: FormDefinition,
  fd: FormData,
): { ok: true } | { ok: false; missing: string[] } {
  const missing: string[] = [];
  for (const section of form.sections) {
    for (const field of section.fields) {
      if (field.required) {
        const v = valueFor(field, fd);
        if (v === "") missing.push(field.label);
      }
    }
  }
  return missing.length === 0 ? { ok: true } : { ok: false, missing };
}

async function generateAiSummary(
  form: FormDefinition,
  responses: SectionResponse[],
): Promise<string | null> {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const responsesText = responses
    .map((section) => {
      const fields = section.fields
        .filter((f) => !f.isEmpty)
        .map((f) => `  - ${f.label}: ${f.value}`)
        .join("\n");
      return fields ? `## ${section.title}\n${fields}` : null;
    })
    .filter(Boolean)
    .join("\n\n");

  if (responsesText.trim() === "") return null;

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 16000,
      system: `You are reviewing a discovery questionnaire submission for elefox studio, a design and software consultancy. Your job is to give the studio owner a fast, useful read of what just came in.

Produce two short sections:

1. **Snapshot** (3 to 5 sentences): the prospect, the practice or business, the core ask, the rough scope signal, and any immediate red flags or green lights you notice. Plain English. No jargon.

2. **Proposed next moves** (3 to 5 bullets): concrete actions the owner should take before the discovery call. Things like "ask about X on the call", "the answer to Y suggests Premier tier is on the table", "watch out for Z in scoping". Be specific. Reference actual answers from the submission.

Tone: direct, conversational, like a smart colleague briefing the owner before a meeting. No marketing fluff. No "exciting opportunity!" language. Be honest about gaps in the data.

Format your response as markdown. Do not include a top-level heading. Start directly with **Snapshot**.`,
      messages: [
        {
          role: "user",
          content: `Form: ${form.title}\nForm intent: ${form.subtitle}\n\nSubmitted responses:\n\n${responsesText}`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return textBlock && textBlock.type === "text" ? textBlock.text : null;
  } catch (err) {
    console.error("Anthropic API error:", err);
    return null;
  }
}

function markdownToHtml(md: string): string {
  // Tiny markdown subset: **bold**, bullet lines, paragraphs.
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      out.push("");
      continue;
    }
    const isBullet = /^[-*]\s+/.test(trimmed);
    if (isBullet) {
      if (!inList) {
        out.push('<ul style="margin:8px 0;padding-left:20px">');
        inList = true;
      }
      const content = trimmed.replace(/^[-*]\s+/, "");
      out.push(`<li style="margin-bottom:6px">${formatInline(content)}</li>`);
    } else {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      out.push(`<p style="margin:8px 0">${formatInline(trimmed)}</p>`);
    }
  }
  if (inList) out.push("</ul>");
  return out.join("\n");
}

function formatInline(text: string): string {
  return escHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function buildEmailHtml(
  form: FormDefinition,
  responses: SectionResponse[],
  aiSummary: string | null,
): string {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const aiBlock = aiSummary
    ? `
    <div style="background:#f7f4ed;border:1px solid #e6e3dc;border-radius:12px;padding:20px 24px;margin:0 0 32px">
      <div style="display:inline-block;padding:4px 10px;background:#3f5a2e;color:#f7f4ed;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;border-radius:9999px;margin-bottom:14px">AI summary</div>
      <div style="color:#1a1f1b;font-size:15px;line-height:1.6">${markdownToHtml(aiSummary)}</div>
    </div>
    `
    : "";

  const sectionsHtml = responses
    .map((section) => {
      const fieldsHtml = section.fields
        .map((f) => {
          const valueHtml = f.isEmpty
            ? '<span style="color:#9b9890;font-style:italic">(not provided)</span>'
            : `<span style="color:#1a1f1b;white-space:pre-wrap">${escHtml(f.value)}</span>`;
          return `
            <tr>
              <td style="padding:10px 0;vertical-align:top;color:#6b7280;width:35%;font-size:13px">${escHtml(f.label)}</td>
              <td style="padding:10px 0;vertical-align:top;font-size:14px">${valueHtml}</td>
            </tr>
          `;
        })
        .join("");
      return `
        <div style="margin-bottom:32px">
          <h3 style="margin:0 0 12px;font-size:15px;font-weight:600;color:#3f5a2e;border-bottom:2px solid #3f5a2e;padding-bottom:8px">${escHtml(section.title)}</h3>
          <table style="width:100%;border-collapse:collapse">
            ${fieldsHtml}
          </table>
        </div>
      `;
    })
    .join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;max-width:680px;margin:0 auto;color:#1a1f1b;padding:0 16px">
      <h1 style="margin:0 0 8px;font-size:24px;color:#1a1f1b">New discovery submission</h1>
      <p style="margin:0 0 24px;color:#6b7280;font-size:14px">${escHtml(form.title)} &middot; ${escHtml(submittedAt)} ET</p>
      ${aiBlock}
      ${sectionsHtml}
      <p style="margin:32px 0 0;font-size:11px;color:#9b9890;text-transform:uppercase;letter-spacing:0.1em">Sent via elefoxstudio.com</p>
    </div>
  `;
}

async function sendNotificationEmail(args: {
  form: FormDefinition;
  responses: SectionResponse[];
  aiSummary: string | null;
  contactEmail: string | null;
}): Promise<void> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing");
    throw new Error("Email not configured");
  }

  const from =
    import.meta.env.RESEND_FROM ?? "elefox studio <hello@elefoxstudio.com>";
  const to =
    import.meta.env.DISCOVERY_NOTIFY_EMAIL ??
    import.meta.env.REPLY_TO_EMAIL ??
    "hello@elefoxstudio.com";

  const html = buildEmailHtml(args.form, args.responses, args.aiSummary);
  const subject = `New discovery: ${args.form.title}`;

  const body: Record<string, unknown> = {
    from,
    to: [to],
    subject,
    html,
  };
  if (args.contactEmail) body.reply_to = args.contactEmail;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("Resend error:", err);
    throw new Error("Resend API error");
  }
}

async function forwardToPortal(args: {
  form: FormDefinition;
  responses: SectionResponse[];
  contactName: string | null;
  contactEmail: string | null;
}): Promise<void> {
  const url = import.meta.env.PORTAL_LEADS_WEBHOOK_URL;
  if (!url) return;
  const secret = import.meta.env.PORTAL_LEADS_WEBHOOK_SECRET;

  const flat: Record<string, string> = {};
  for (const section of args.responses) {
    for (const field of section.fields) {
      if (!field.isEmpty) flat[field.label] = field.value;
    }
  }

  const payload = {
    source: "elefoxstudio-discovery",
    form_slug: args.form.slug,
    form_title: args.form.title,
    name: args.contactName ?? "",
    email: args.contactEmail ?? "",
    message: `Discovery questionnaire submission for ${args.form.title}`,
    fields: flat,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { "x-leads-secret": secret } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Portal webhook error:", response.status, text);
    }
  } catch (err) {
    console.error("Portal webhook POST failed:", err);
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const fd = await request.formData();

  // Honeypot: bots fill hidden fields, humans don't see them
  const hp = fd.get("_hp");
  if (typeof hp === "string" && hp.trim() !== "") {
    // Silently accept so bots don't know they were caught
    return Response.redirect(new URL(`/discovery/${fd.get("_slug")}/thank-you`, request.url), 303);
  }

  // Timing: legitimate users take at least 3 seconds to fill this out
  const tRaw = fd.get("_t");
  const t = typeof tRaw === "string" ? Number(tRaw) : NaN;
  if (Number.isFinite(t) && Date.now() - t < 3000) {
    return Response.redirect(new URL(`/discovery/${fd.get("_slug")}/thank-you`, request.url), 303);
  }

  // Rate limit
  let ip = "unknown";
  try {
    ip = clientAddress;
  } catch {
    const fwd = request.headers.get("x-forwarded-for");
    if (fwd) ip = fwd.split(",")[0].trim();
  }
  if (isRateLimited(ip)) {
    return new Response("Too many submissions, please try again later.", {
      status: 429,
    });
  }

  // Resolve form by slug
  const slug = fd.get("_slug");
  const form = typeof slug === "string" ? getForm(slug) : null;
  if (!form) {
    return new Response("Unknown form.", { status: 404 });
  }

  // Validate required fields
  const validation = validateRequired(form, fd);
  if (!validation.ok) {
    const back = new URL(`/discovery/${form.slug}`, request.url);
    back.searchParams.set("error", "validation");
    return Response.redirect(back, 303);
  }

  // Shape responses
  const responses = shapeResponses(form, fd);
  const contactEmail = typeof fd.get("contact_email") === "string"
    ? (fd.get("contact_email") as string).trim()
    : null;
  const contactName = typeof fd.get("contact_name") === "string"
    ? (fd.get("contact_name") as string).trim()
    : null;

  // Kick off AI summary in parallel with sending
  const aiPromise = generateAiSummary(form, responses);

  try {
    const aiSummary = await aiPromise;
    await sendNotificationEmail({
      form,
      responses,
      aiSummary,
      contactEmail: contactEmail && contactEmail !== "" ? contactEmail : null,
    });
  } catch (err) {
    console.error("Discovery submit failed:", err);
    const back = new URL(`/discovery/${form.slug}`, request.url);
    back.searchParams.set("error", "send_failed");
    return Response.redirect(back, 303);
  }

  // Fire-and-forget portal forward
  forwardToPortal({
    form,
    responses,
    contactName: contactName && contactName !== "" ? contactName : null,
    contactEmail: contactEmail && contactEmail !== "" ? contactEmail : null,
  });

  return Response.redirect(
    new URL(`/discovery/${form.slug}/thank-you`, request.url),
    303,
  );
};
