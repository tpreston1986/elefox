/**
 * Client testimonials, pulled from the client portal's public feed
 * (portal.elefoxstudio.com/api/public/testimonials). The portal only lists
 * quotes the client agreed to share and Tiffany approved, so whatever comes
 * back here is safe to show.
 *
 * Cached in memory for 10 minutes. The fetch gives up after 1.5s so a slow
 * or down portal never holds up the homepage; on failure we keep showing the
 * last good list (or nothing, and the section hides itself).
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string | null;
  rating: number | null;
};

const PORTAL = (import.meta.env.PORTAL_URL ?? "https://portal.elefoxstudio.com").replace(/\/$/, "");
const TTL_MS = 10 * 60 * 1000;
const RETRY_MS = 60 * 1000;

let cache: { fetchedAt: number; ttl: number; items: Testimonial[] } | null = null;

function clean(raw: unknown): Testimonial | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const quote = typeof r.quote === "string" ? r.quote.trim().slice(0, 2000) : "";
  const name = typeof r.name === "string" ? r.name.trim().slice(0, 120) : "";
  if (!quote || !name) return null;
  const role = typeof r.role === "string" && r.role.trim() ? r.role.trim().slice(0, 160) : null;
  const rating =
    typeof r.rating === "number" && Number.isInteger(r.rating) && r.rating >= 1 && r.rating <= 5
      ? r.rating
      : null;
  return { id: String(r.id ?? `${name}-${quote.length}`), quote, name, role, rating };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (cache && Date.now() - cache.fetchedAt < cache.ttl) return cache.items;
  try {
    const res = await fetch(`${PORTAL}/api/public/testimonials`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { testimonials?: unknown };
    const items = Array.isArray(data.testimonials)
      ? data.testimonials.map(clean).filter((t): t is Testimonial => t !== null)
      : [];
    cache = { fetchedAt: Date.now(), ttl: TTL_MS, items };
    return items;
  } catch (err) {
    console.warn("[testimonials] portal feed unavailable:", (err as Error).message);
    const items = cache?.items ?? [];
    cache = { fetchedAt: Date.now(), ttl: RETRY_MS, items };
    return items;
  }
}
