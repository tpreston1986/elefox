export type Tier = {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  features: string[];
  badge?: string;
  cta?: { label: string; href: string };
};

export type Service = {
  slug: string;
  name: string;
  /** Short label for tags and filters (work cards, pills). */
  shortName: string;
  title: string;
  /** Substring of `title` to render with the animated gradient accent. */
  titleAccent?: string;
  oneLiner: string;
  description: string;
  tiers?: Tier[];
  good: string[];
  skip: string[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Menu mirrored on Movadex's structure: two flagship offers (MVP in 10 Days +
// Creative Services Subscription — see /src/pages/mvp.astro & /subscription.astro)
// followed by the capability services below.
//
// Prices on the mobile and early-stage services were anchored to the
// existing web/software pricing and confirmed as-is on 2026-09-28.
// ─────────────────────────────────────────────────────────────────────────────

export const services: Record<string, Service> = {
  websites: {
    slug: "websites",
    name: "Web development",
    shortName: "Websites",
    title: "Websites that earn their keep.",
    titleAccent: "earn their keep",
    oneLiner:
      "Sites that load fast, explain what you do, and make it easy for people to reach you.",
    description:
      "Anything from a tight one-pager to a full site built to bring in leads. We design it and we build it. Every site ships with proper SEO and accessible markup, and from the Growth Site tier up, you can edit it yourself.",
    tiers: [
      {
        name: "Starter Lead Site",
        price: "$2,000",
        blurb: "One to three pages. Built to capture leads from day one.",
        features: [
          "Up to 3 pages",
          "Contact form with spam protection",
          "Core SEO (meta, sitemap, schema)",
          "Mobile-first responsive design",
          "1-week turnaround",
        ],
      },
      {
        name: "Growth Site",
        price: "$5,000",
        blurb: "Five to seven pages with lead funnels and a real CMS.",
        features: [
          "5 to 7 pages",
          "Service area + testimonial pages",
          "Lead capture funnels",
          "Editable CMS (we'll show you the ropes)",
          "Analytics + conversion tracking",
        ],
      },
      {
        name: "Premium Conversion Site",
        price: "Custom",
        blurb: "Strategy session, advanced SEO, integrations, ongoing optimization.",
        features: [
          "Strategy + content workshop",
          "Advanced SEO + schema",
          "Booking, payment, or CRM integrations",
          "Email capture + nurture",
          "Ongoing optimization (optional)",
        ],
      },
    ],
    good: [
      "You're tired of templates that don't match how you work",
      "You want a site you can actually update without calling a developer",
      "Lead gen, bookings, or qualified inbound is the goal",
    ],
    skip: [
      "You need an e-commerce store with 500+ SKUs",
      "You want a $300 Wix site",
      "You're not ready to put real content into it",
    ],
  },

  mobile: {
    slug: "mobile",
    name: "Mobile development",
    shortName: "Mobile apps",
    title: "Apps and games that actually ship.",
    titleAccent: "actually ship",
    oneLiner:
      "iOS and Android apps (and mobile games), designed, built, and shipped to the stores.",
    description:
      "We've taken mobile apps and games from first idea to a live listing in the App Store and Google Play. They feel native, they run fast, and they're built to keep getting updates instead of being abandoned the week after launch.",
    tiers: [
      {
        name: "App MVP",
        price: "From $6,000",
        cadence: "+ hosting from $50/mo",
        blurb: "A focused first version on one platform, in real hands fast.",
        features: [
          "One platform (iOS or Android)",
          "Core feature set, scoped tight",
          "Real backend + data",
          "Store submission handled",
          "4 to 6 week typical build",
        ],
      },
      {
        name: "Cross-platform App",
        price: "From $12,000",
        cadence: "+ hosting from $50/mo",
        blurb: "The full app from one codebase, live in both the App Store and Google Play.",
        features: [
          "iOS + Android from one codebase",
          "Push, auth, payments as needed",
          "Both store submissions",
          "Analytics wired in",
          "Built to keep shipping updates",
        ],
      },
      {
        name: "Games & custom",
        price: "Custom",
        blurb: "Mobile games and ambitious builds, scoped to the idea.",
        features: [
          "Game design + build",
          "Custom mechanics + feel",
          "Monetization if you want it",
          "Scoped after a call",
        ],
      },
    ],
    good: [
      "You've validated the idea and want it in the stores",
      "You want one team from design through store submission",
      "You care about it feeling native, not like a wrapped website",
    ],
    skip: [
      "You need it live next week on no budget",
      "A responsive website would honestly do the job",
      "You expect us to guarantee App Store featuring",
    ],
  },

  software: {
    slug: "software",
    name: "Custom software development",
    shortName: "Custom software",
    title: "The custom software your team actually wants to use.",
    titleAccent: "wants to use",
    oneLiner:
      "Custom software for teams that no off-the-shelf tool fits: CRMs, client portals, booking systems, and the internal tools that hold it all together.",
    description:
      "Off-the-shelf software makes you adapt to it: the same fields, the same workflow, and the same vocabulary as every other customer. We flip that around and build it around your terminology and your process. We design it, build it, host it, and support it, and it's yours.",
    tiers: [
      {
        name: "Custom CRM",
        price: "From $3,500",
        cadence: "+ hosting from $50/mo",
        blurb: "For relationship-driven businesses. It tracks people and follow-ups the way your team already does. We host it, and it's yours for good.",
        features: [
          "Discovery + scoping session",
          "Custom fields, stages, automations",
          "Built around your terminology",
          "Relationship-first contact + activity tracking",
          "6-week typical build",
          "Hosting from $50/mo: backups, uptime, bug fixes",
        ],
      },
      {
        name: "Client Portals",
        price: "From $5,000",
        cadence: "+ hosting from $50/mo",
        blurb: "Where your clients see their work, sign contracts, and pay invoices.",
        features: [
          "Project + file delivery",
          "Quotes + contracts + invoices",
          "Stripe-powered payments",
          "Messaging + approvals",
          "We use this ourselves",
        ],
      },
      {
        name: "Internal tools & dashboards",
        price: "From $4,000",
        cadence: "+ hosting from $50/mo",
        blurb: "PM tools, ops dashboards, reporting, whatever your team operates on.",
        features: [
          "Discovery → build → operate",
          "Integrates with what you have",
          "Built for your real workflow",
          "Optional AI features where they help",
        ],
      },
    ],
    good: [
      "Your software costs more than the time it saves",
      "You've outgrown the spreadsheet but no vendor fits",
      "You want to own the system, not rent it",
    ],
    skip: [
      "You can solve it with a no-code tool in an afternoon",
      "You want to be the platform's biggest customer for $99/mo",
      "Your processes change every two weeks",
    ],
  },

  brand: {
    slug: "brand",
    name: "Branding",
    shortName: "Branding",
    title: "Brand that reads as professional, and feels like you.",
    titleAccent: "feels like you",
    oneLiner: "Brand kits, social templates, and newsletters that keep you looking like you, everywhere.",
    description:
      "A logo is just the start. We build the kit, the templates, and the routine that keep your business looking consistent everywhere you show up.",
    tiers: [
      {
        name: "Brand Creation",
        price: "$1,500",
        blurb: "Logo, palette, typography, and a real usage guide.",
        features: [
          "Logo + mark (3 concepts)",
          "Color palette + type system",
          "Brand usage guide (PDF + web)",
          "Source files included",
        ],
      },
      {
        name: "Social Launch Kit",
        price: "$500",
        blurb: "Templates and assets so you can post consistently without designing every time.",
        features: [
          "20 branded templates",
          "Story, post, carousel, reel formats",
          "Caption + content prompts",
          "Canva editable handoff",
        ],
      },
      {
        name: "Newsletter System",
        price: "$1,500",
        cadence: "+ hosting from $50/mo",
        blurb: "Branded newsletter, list management, and the cadence to ship it.",
        features: [
          "Branded email template",
          "Resend audience + list mgmt",
          "Signup forms on your site",
          "First three issues ghost-written (optional)",
        ],
      },
      {
        name: "Ongoing Social Assets",
        price: "$200",
        cadence: "/month",
        blurb: "Monthly drop of fresh branded assets so you keep posting.",
        features: [
          "10 to 15 new assets per month",
          "Made for your upcoming campaigns",
          "Quick-turn requests included",
        ],
      },
    ],
    good: [
      "You look different on every platform and it bugs you",
      "You're starting from a logo a friend made in 2019",
      "You want to post regularly but designing each time is the bottleneck",
    ],
    skip: [
      "You need a 60-page brand book and a logo unveiling",
      "You're hoping a logo will fix a product problem",
    ],
  },

  "early-stage": {
    slug: "early-stage",
    name: "Custom build for early-stage business",
    shortName: "Early-stage",
    title: "The whole first version, from one team.",
    titleAccent: "one team",
    oneLiner:
      "For founders who need brand, site, app, and the systems behind them, without hiring five vendors to wrangle.",
    description:
      "When you're just getting off the ground, you don't need five freelancers and a project manager to herd them. We're one studio that takes an early-stage business from idea to launched: brand, website, product, and the tools to run it, built together so everything fits.",
    tiers: [
      {
        name: "Launch Package",
        price: "From $8,000",
        blurb: "Brand + site + a working first product, scoped to get you live.",
        features: [
          "Brand basics + identity",
          "Marketing site",
          "First working version of your product",
          "Set up to run from day one",
        ],
      },
      {
        name: "Full Studio",
        price: "Custom",
        blurb: "We're your product, design, and dev team until you build your own.",
        features: [
          "Everything in Launch Package",
          "Ongoing build capacity",
          "The CRM + tools you run on",
          "One team, one point of contact",
        ],
      },
    ],
    good: [
      "You're pre-launch and wearing every hat",
      "You'd rather have one team than manage five",
      "You want to launch fast without it looking cheap",
    ],
    skip: [
      "You already have an in-house product team",
      "You need a single deliverable, not a launch",
      "You want the cheapest possible option, quality aside",
    ],
  },

  // Kept live and reachable at /services/ai, but intentionally out of the
  // Movadex-mirrored menu (Movadex lists no standalone AI service). Say the
  // word and it goes back into nav as a 10th item or folds into Custom software.
  ai: {
    slug: "ai",
    name: "AI & automation",
    shortName: "AI & automation",
    title: "AI, but only where it helps.",
    titleAccent: "where it helps",
    oneLiner:
      "We help you figure out where AI fits in your business, and quietly wire it in.",
    description:
      "Tell us what's eating your team's time and we'll tell you straight whether automation can fix it. If it can, we scope a small pilot and build it. If it can't, we'll say so, and nobody gets a chatbot they didn't need.",
    good: [
      "You have repetitive work eating your team's hours",
      "You've tried an AI tool but it didn't fit your real workflow",
      "You want help thinking through where to start (not a sales pitch)",
    ],
    skip: [
      "You want to be on the cover of a magazine for using AI",
      "You expect AI to think for itself with no human in the loop",
      "Your data lives in a fax machine",
    ],
  },
};

export const allServices = Object.values(services);

/**
 * The capability services in Movadex-mirrored order, flagships excluded.
 * (Flagship offers — MVP in 10 Days, Creative Services Subscription — live on
 * their own pages.) `ai` is deliberately not in this list. UI/UX was folded
 * into the builds on 2026-09-30: design is part of every site, app, and tool.
 */
export const menuOrder = [
  "websites",
  "mobile",
  "software",
  "brand",
  "early-stage",
] as const;

export const menuServices = menuOrder
  .map((slug) => services[slug])
  .filter((s): s is Service => Boolean(s));
