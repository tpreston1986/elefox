import { defineMiddleware } from "astro:middleware";

/**
 * Site-wide response middleware:
 *  - 301 redirect /sitemap.xml → /sitemap-index.xml (crawlers try both)
 *  - Apply security headers to every response (HSTS, CSP, nosniff, etc.)
 *  - Apply Cache-Control by path category (long for hashed assets, short for HTML)
 *
 * If a third-party script/font/connect domain is added to the site, also add it
 * to the matching CSP source list below or the page will silently break.
 */

// Domains we currently use and need to allow in CSP. Keep this list tight.
// Note on default-src 'none': we explicitly set every source type below.
// prefetch-src 'self' is included as a (deprecated but still respected by
// some browsers) safety net so Astro's hover-prefetch still works under the
// stricter default. Modern browsers fall back to default-src; since prefetch
// of same-origin HTML is harmless, we accept that some prefetches may fail
// silently rather than weaken the default.
const CSP = [
  "default-src 'none'",
  // Inline scripts: GA bootstrap, cookie banner, ?noga opt-out, Meta Pixel
  // injector, etc. We rely on 'unsafe-inline' for now; nonces would be the
  // upgrade path later.
  "script-src 'self' 'unsafe-inline' " +
    "https://www.googletagmanager.com " +
    "https://www.google-analytics.com " +
    "https://static.cloudflareinsights.com " +
    "https://challenges.cloudflare.com " +
    "https://connect.facebook.net " +
    "https://app.cal.com " + // Cal.com inline scheduler embed loader
    "https://cdn.jsdelivr.net", // GSAP, used by iframed walkthroughs
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // Allow data: + https: images so Resend email pixels, og:image previews, and
  // analytics tracking pixels keep working.
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob: https:",
  "connect-src 'self' " +
    "https://www.google-analytics.com " +
    "https://region1.google-analytics.com " +
    "https://www.facebook.com " +
    "https://connect.facebook.net " +
    "https://challenges.cloudflare.com " +
    "https://static.cloudflareinsights.com " +
    "https://cloudflareinsights.com " +
    "https://app.cal.com " + // Cal.com embed availability/slot API
    "https://cal.com",
  // Frame sources: Turnstile widget, Meta tracking, and the Cal.com inline
  // scheduler iframe (served from both cal.com and app.cal.com).
  "frame-src 'self' https://challenges.cloudflare.com https://www.facebook.com https://cal.com https://app.cal.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "prefetch-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security":
    "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Content-Security-Policy": CSP,
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // 301 /sitemap.xml → /sitemap-index.xml so crawlers that try either land
  // on a real sitemap. Use a Location header with a relative path: in SSR
  // mode the request URL's origin is the internal localhost, not the public
  // domain, so Response.redirect(...absolute...) would point at localhost.
  if (url.pathname === "/sitemap.xml") {
    return new Response(null, {
      status: 301,
      headers: { Location: "/sitemap-index.xml" },
    });
  }

  const response = await next();

  // Security headers — applied to everything.
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(k, v);
  }

  // Cache-Control by path category.
  if (url.pathname.startsWith("/_astro/")) {
    // Astro emits fingerprinted asset filenames here. Safe to cache forever.
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
  } else if (url.pathname.startsWith("/walkthroughs/")) {
    // Walkthrough HTML + assets change rarely; cache a day at the edge.
    response.headers.set("Cache-Control", "public, max-age=86400");
  } else if (
    /\.(woff2?|ttf|otf|webp|png|jpg|jpeg|gif|svg|ico|mp4|webm)$/.test(
      url.pathname,
    )
  ) {
    // Public images / fonts / video / icons — cache a day.
    response.headers.set("Cache-Control", "public, max-age=86400");
  } else if (response.headers.get("content-type")?.includes("text/html")) {
    // HTML pages — let the browser revalidate so updates are immediate.
    response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return response;
});
