import type { APIRoute } from "astro";
import { forwardToPortal, verifyApproveToken } from "../../lib/lead";

export const prerender = false;

/* Owner clicks the "Approve and push to CRM" button inside a flagged
   notification email. We verify the HMAC-signed token, push the lead to
   the portal CRM, and render a small confirmation page. */

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function page(opts: {
  title: string;
  body: string;
  tone?: "ok" | "error";
}): Response {
  const isErr = opts.tone === "error";
  const accent = isErr ? "#C8623A" : "#3F5A2E";
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>${escHtml(opts.title)} · elefox studio</title>
<style>
  body{margin:0;background:#F7F4ED;color:#1A1F1B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
  .card{background:#fff;border:1px solid #E6E3DC;border-left:4px solid ${accent};border-radius:14px;max-width:520px;width:100%;padding:32px 28px;box-shadow:0 8px 24px rgba(26,31,27,.06)}
  h1{margin:0 0 10px;font-size:24px;letter-spacing:-.02em;color:#1A1F1B}
  p{margin:0 0 12px;color:#3A3E3A;line-height:1.55}
  a{color:${accent};text-decoration:none;font-weight:600}
  a:hover{text-decoration:underline}
  .meta{margin-top:18px;padding-top:18px;border-top:1px solid #E6E3DC;font-size:13px;color:#3A3E3A}
</style>
</head>
<body><div class="card">${opts.body}</div></body>
</html>`;
  return new Response(html, {
    status: isErr ? 400 : 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get("t") ?? "";
  if (!token) {
    return page({
      title: "Missing token",
      tone: "error",
      body: `<h1>Missing token</h1><p>This link is incomplete. Open the original notification email and click the approve button there.</p>`,
    });
  }

  const lead = verifyApproveToken(token);
  if (!lead) {
    return page({
      title: "Invalid or expired link",
      tone: "error",
      body: `<h1>Link is invalid or expired</h1><p>This approve link couldn't be verified. It may have been tampered with, or it's older than 30 days. You can still create the lead manually from the email's contents.</p>`,
    });
  }

  await forwardToPortal(lead);

  return page({
    title: "Lead pushed to CRM",
    body: `<h1>Pushed to the CRM</h1>
      <p><strong>${escHtml(lead.name || "(no name)")}</strong> · ${escHtml(lead.email || "(no email)")}</p>
      <p>The lead is now in the portal. You can close this tab.</p>
      <p class="meta">
        <a href="https://portal.elefoxstudio.com/admin/leads">Open the portal →</a>
      </p>`,
  });
};
