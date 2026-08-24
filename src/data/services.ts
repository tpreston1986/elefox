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
// NOTE(Tiffany): every dollar figure on the FOUR NEW services (mobile, uiux, qa,
// early-stage) is a placeholder anchored to your existing web/software pricing.
// Confirm or change before this goes live.
// ─────────────────────────────────────────────────────────────────────────────

export const services: Record<string, Service> = {
  websites: {
    slug: "websites",
    name: "Web development",
    title: "Websites that earn their keep.",
    titleAccent: "earn their keep",
    oneLiner:
      "Sites built for the way you actually sell. Fast, clear, ready to convert.",
    description:
      "From a tight one-pager to a full conversion engine. Every site ships with real SEO and accessible markup. CMS-editable from the Growth Site tier up.",
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
        badge: "Most Popular",
        features: [
          "5–7 pages",
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
    title: "Apps and games that actually ship.",
    titleAccent: "actually ship",
    oneLiner:
      "iOS and Android apps, and mobile games, designed, built, and shipped to the stores.",
    description:
      "We've shipped real mobile apps and games, from first idea to a live listing in the App Store and Google Play. Native-feeling, fast, and built to be updated, not abandoned the week after launch.",
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
          "4–6 week typical build",
        ],
      },
      {
        name: "Cross-platform App",
        price: "From $12,000",
        cadence: "+ hosting from $50/mo",
        badge: "Most Popular",
        blurb: "One codebase, both stores. The full app, iOS and Android together.",
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
    title: "CRMs, portals, and the software your team actually wants to use.",
    titleAccent: "wants to use",
    oneLiner:
      "Custom CRMs for realtors, advisors, therapists, and small teams who run on relationships, plus client portals, booking systems, and the internal tools that hold it all together.",
    description:
      "Off-the-shelf CRM software makes you adapt to it: the same fields, the same pipeline, the same vocabulary as every other customer. We build the opposite. Tools that match your terminology, your workflow, and the way you actually talk about your clients. Hosted, supported, and yours.",
    tiers: [
      {
        name: "Custom CRM",
        price: "From $3,500",
        cadence: "+ hosting from $50/mo",
        blurb: "For relationship-driven businesses. Yours forever, hosted by us, shaped to how your team actually tracks people and follow-ups.",
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
          "Optional AI augmentation",
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

  uiux: {
    slug: "uiux",
    name: "UI/UX design",
    title: "Interfaces people know how to use.",
    titleAccent: "how to use",
    oneLiner:
      "Product design, user flows, and interfaces, from wireframe to polished, build-ready screens.",
    description:
      "The design layer that sits under everything we build, offered on its own. We map the flows, design the screens, and hand off something your developers (or ours) can build without guessing what you meant.",
    tiers: [
      {
        name: "Design Sprint",
        price: "$2,500",
        blurb: "Wireframes and flows for one product or feature, fast.",
        features: [
          "Up to ~10 key screens",
          "User flows + wireframes",
          "Clickable prototype",
          "One revision round",
        ],
      },
      {
        name: "Product Design",
        price: "From $5,000",
        badge: "Most Popular",
        blurb: "Full UI design, build-ready, with a reusable design system.",
        features: [
          "Full UI for your product",
          "Reusable component system",
          "Dev-ready handoff (Figma)",
          "Two revision rounds",
        ],
      },
      {
        name: "Ongoing / Custom",
        price: "Custom",
        blurb: "A design partner for a product that keeps evolving.",
        features: [
          "Monthly design capacity",
          "New features + iteration",
          "Usability review",
          "Scoped to your roadmap",
        ],
      },
    ],
    good: [
      "You have a product that works but feels clunky",
      "You need build-ready screens, not just pretty pictures",
      "Your developers keep guessing at what you meant",
    ],
    skip: [
      "You want a logo (that's Branding)",
      "You need a single social graphic",
      "You're not ready to change the current design",
    ],
  },

  brand: {
    slug: "brand",
    name: "Branding",
    title: "Brand that reads as professional, and feels like you.",
    titleAccent: "feels like you",
    oneLiner: "Brand kits, social systems, and marketing infrastructure for the long haul.",
    description:
      "Strong brand isn't a logo, it's a system. We build the kit, the templates, and the production rhythm so your business looks consistent everywhere.",
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
        badge: "Most Popular",
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
          "10–15 new assets per month",
          "Tailored to upcoming campaigns",
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
    title: "The whole first version, from one team.",
    titleAccent: "one team",
    oneLiner:
      "For founders who need brand, site, app, and the systems behind them, without hiring five vendors to wrangle.",
    description:
      "When you're just getting off the ground, you don't need five freelancers and a project manager to herd them. We're one studio that takes an early-stage business from idea to launched: brand, website, product, and the tools to run it, built together so they actually fit.",
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
        badge: "Most Popular",
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
    title: "AI, where it earns its keep.",
    titleAccent: "earns its keep",
    oneLiner:
      "We help you figure out where AI fits in your business, and quietly wire it in.",
    description:
      "AI isn't a product we sell. It's a capability we help you use. Tell us your bottleneck and we'll show you whether automation actually solves it, and if it does, we'll scope and build a pilot. No chatbots on every page, no AI for AI's sake.",
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
 * their own pages.) `ai` is deliberately not in this list.
 */
export const menuOrder = [
  "websites",
  "mobile",
  "software",
  "uiux",
  "brand",
  "early-stage",
] as const;

export const menuServices = menuOrder
  .map((slug) => services[slug])
  .filter((s): s is Service => Boolean(s));
