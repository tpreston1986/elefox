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

export const services: Record<string, Service> = {
  websites: {
    slug: "websites",
    name: "Websites",
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

  software: {
    slug: "software",
    name: "Custom software",
    title: "CRMs, portals, and the software your team actually wants to use.",
    titleAccent: "actually wants to use",
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

  brand: {
    slug: "brand",
    name: "Brand & marketing",
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
