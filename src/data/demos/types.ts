// Per-client demo configs power the /demo/[slug] routes. The demo chassis
// reads everything visible (brand, practitioners, services, locations, copy)
// from these objects, so onboarding a new prospect is a one-file change.

export type Location = {
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  hours?: string;
};

export type Practitioner = {
  name: string;
  credentials: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
};

export type Service = {
  name: string;
  category?: string;
  durationMinutes?: number;
  priceUsd?: number;
  description?: string;
};

export type DemoBrand = {
  /** Display name (logo wordmark if no logoUrl provided). */
  wordmark: string;
  /** Optional logo image URL — falls back to wordmark text. */
  logoUrl?: string;
  /** Optional favicon URL (SVG / PNG / ICO). If omitted, DemoLayout
   *  generates an SVG favicon from the wordmark initials + primary color
   *  — keeps the browser tab fully client-branded even without a real logo. */
  faviconUrl?: string;
  /** Primary CTA / accent color. */
  primary: string;
  /** Hover/pressed primary. */
  primaryDeep: string;
  /** Page background. */
  background: string;
  /** Card / surface bg. */
  surface: string;
  /** Body text. */
  text: string;
  /** Secondary/muted text. */
  textMuted: string;
  /** Subtle border. */
  border: string;
  /** Optional supporting accent. */
  accent?: string;
  /** Google Fonts family for display text — omit to use the default serif. */
  displayFont?: string;
  /** Google Fonts family for body — omit to use Inter. */
  bodyFont?: string;
};

export type DemoPitch = {
  /** One-line problem statement the demo is responding to. */
  coreProblem: string;
  /** Tier we're showing (Premier / Standard / Essentials). */
  proposedTier: "Premier" | "Standard" | "Essentials" | string;
  /** Optional one-line tagline to render in the hero. */
  tagline?: string;
};

export type ClientDemoConfig = {
  slug: string;
  /** Full client display name, used by the demo banner. */
  clientName: string;
  brand: DemoBrand;
  pitch: DemoPitch;
  locations: Location[];
  practitioners: Practitioner[];
  services: Service[];
};
