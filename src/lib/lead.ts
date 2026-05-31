// Shared lead helpers — used by /api/contact (intake) and /api/lead-approve
// (one-click push to the portal CRM for submissions that were flagged as
// possible spam in the notification email).
import { createHmac, timingSafeEqual } from "node:crypto";

export type Shaped = {
  services: string;
  businessName: string;
  industry: string;
  description: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

/* ── Portal CRM forwarder ──────────────────────────────────────────── */

/** Fire-and-forget: create a Lead row in the portal CRM. */
export async function forwardToPortal(d: Shaped): Promise<void> {
  const url = import.meta.env.PORTAL_LEADS_WEBHOOK_URL;
  if (!url) return;
  const secret = import.meta.env.PORTAL_LEADS_WEBHOOK_SECRET;
  if (!secret) return; // portal fails closed without the shared secret

  const messageParts = [
    d.phone && `Phone: ${d.phone}`,
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
      console.error("[lead] Portal webhook error:", response.status, text);
    }
  } catch (err) {
    console.error("[lead] Portal webhook POST failed:", err);
  }
}

/* ── Approve-link signing (HMAC) ───────────────────────────────────── */
/* Build a tamper-proof token containing the full shaped lead. The flagged
   notification email includes a link with this token; the /api/lead-approve
   endpoint verifies the signature and forwards to the portal CRM. */

function b64url(input: Buffer | string): string {
  const b = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return b
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(s: string): Buffer {
  // Pad back to a multiple of 4 so Buffer.from understands it.
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(
    s.replace(/-/g, "+").replace(/_/g, "/") + pad,
    "base64",
  );
}

function approveSecret(): string {
  return import.meta.env.PORTAL_LEADS_WEBHOOK_SECRET ?? "";
}

/** Returns a token of the form `<payload>.<signature>` (both base64url). */
export function signApproveToken(d: Shaped): string {
  const secret = approveSecret();
  if (!secret) return ""; // approve flow disabled if no secret
  const payload = JSON.stringify({ iat: Date.now(), ...d });
  const dEnc = b64url(payload);
  const sig = createHmac("sha256", secret).update(dEnc).digest();
  return `${dEnc}.${b64url(sig)}`;
}

/** Verify a token and return the original Shaped, or null on any failure. */
export function verifyApproveToken(token: string): Shaped | null {
  const secret = approveSecret();
  if (!secret) return null;
  const [dEnc, sEnc] = token.split(".");
  if (!dEnc || !sEnc) return null;

  const expected = createHmac("sha256", secret).update(dEnc).digest();
  const given = b64urlDecode(sEnc);
  if (given.length !== expected.length) return null;
  if (!timingSafeEqual(given, expected)) return null;

  try {
    const data = JSON.parse(b64urlDecode(dEnc).toString("utf8")) as Shaped & {
      iat?: number;
    };
    // Reject tokens older than 30 days.
    if (
      typeof data.iat === "number" &&
      Date.now() - data.iat > 30 * 24 * 60 * 60 * 1000
    ) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/** Absolute URL the flagged notification email links to. */
export function buildApproveUrl(d: Shaped): string {
  const token = signApproveToken(d);
  if (!token) return "";
  const origin =
    import.meta.env.PUBLIC_SITE_URL ?? "https://elefoxstudio.com";
  return `${origin}/api/lead-approve?t=${encodeURIComponent(token)}`;
}
