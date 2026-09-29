// ─────────────────────────────────────────────────────────────────────────────
// The "Work" page: client builds and elefox's own products, each linking to a
// case-study detail page (/work/<slug>).
//
// Client case studies (Cloud Clean, Etchra, HowPayrollworks, Chenoa, RKG,
// Client Portal) are ported from the tiffanyrussell.me portfolio, rewritten in
// the studio's voice. Facts, numbers, and stacks match that source; the portal's
// file storage is Cloudflare R2 per the Design Portal README.
//
// Debt.com, Debt.ca, Pulse, and SavingsXL stay on the personal portfolio only
// (day-job work, not studio work). Five Element portal is omitted (real client +
// PHI).
//
// Product screenshots (portal, Kith, Lumi, Ledger, Contractor) were captured
// from throwaway local demo databases, so every name and number is fake.
//
// Thumbnails are composed in code by WorkCard.astro from `brand` + `thumb`, so
// every card shares one system: the project's own color field, soft light, and
// either its real UI in a window rising off the card or its product icon.
// ─────────────────────────────────────────────────────────────────────────────

export type TechGroup = { group: string; items: string[] };

export type Brand = {
  /** Card / hero background. */
  field: string;
  /** Soft light that blooms from the top of the card. */
  glow: string;
  /** "light" = light text on a dark field, "dark" = ink text on a light field. */
  tone: "light" | "dark";
};

/** Crop a screenshot that has a baked-in margin, in source pixels. */
export type Inset = { left: number; top: number; width: number; srcWidth: number };

export type Thumb =
  | {
      kind: "screen";
      src: string;
      /** Optional phone screenshot layered over the window. */
      mobile?: string;
      /** CSS object-position for the window image. Defaults to top. */
      position?: string;
      inset?: Inset;
    }
  | { kind: "icon"; src: string }
  /** A mobile app: two or three phone screens rising off the card. */
  | { kind: "phones"; screens: string[]; /** Screen aspect ratio, default "9 / 16". */ ratio?: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Service slugs (keys of data/services.ts). */
  services: string[];
  brand: Brand;
  thumb: Thumb;
  url?: string;
  status?: "Live";
  // ── Case study (all optional; the detail page renders what's present) ──
  meta?: { label: string; value: string }[];
  overview?: string;
  challenge?: string;
  solution?: string;
  built?: string[];
  results?: { stat?: string; label: string }[];
  tech?: TechGroup[];
  gallery?: string[];
  /** "phones" lays tall app screenshots out side by side instead of stacked. */
  galleryLayout?: "phones";
  /** A short video shown on the case study (e.g. a launch ad). */
  video?: { src: string; poster: string; heading: string; body: string };
  outcome?: string;
};

/** Service slugs from data/services.ts, so tags and filters share one list. */
export { services as serviceData } from "./services";

// Grid order reads left to right, three to a row on desktop. Colors are
// sequenced so no two neighbors share a hue. With 13 projects, the last
// one sits alone in the middle column (see work.astro).
export const projects: Project[] = [
  {
    slug: "etchra",
    name: "Etchra",
    tagline:
      "Booking software for tattoo artists. Request, quote, deposit, and calendar in one link the artist owns.",
    services: ["early-stage", "software", "brand"],
    brand: { field: "#5c1a28", glow: "#c25a6c", tone: "light" },
    thumb: { kind: "screen", src: "/work/etchra-1.webp" },
    url: "https://etchra.com",
    status: "Live",
    meta: [
      { label: "Type", value: "Our product" },
      { label: "For", value: "Tattoo artists" },
      { label: "Year", value: "2026" },
      { label: "Stage", value: "Live" },
    ],
    overview:
      "Etchra takes the mess out of booking tattoo clients. Requests, quotes, times, deposits, and a calendar, all in one link the artist owns. We built every piece of it (brand, product, and code): a request form that arrives ready to quote, a quote-and-times flow the artist can send from the chair, deposits that go straight to the artist, and a calendar that thinks in sessions. Flat monthly price, no cut of deposits, no fee on the client.",
    challenge:
      "Tattoo booking runs on DMs, screenshots, and a notes app. Artists lose requests, chase deposits, and hand a percentage to booking tools that treat them like a marketplace. The job was to replace all of that with one link, without taking a cut of the artist's money or putting a fee in front of their clients.",
    solution:
      "Start where clients already are: Instagram. One link in the bio opens a form that asks exactly what an artist needs to price a piece, in an order clients are happy to answer. Custom and flash are different requests, so the form knows the difference. From there the artist quotes, offers times, and confirms a deposit without leaving the request. Deposits move on the artist's own Zelle, Venmo, or Cash App, so Etchra never touches the money and never holds a payout.",
    built: [
      "A request form that arrives ready to quote, with source tracking for Instagram, site, and walk-ins",
      "Quote, times, and deposit in one flow the artist can send from the chair",
      "Deposits that go straight to the artist. No percentage, no client fee, no payout hold",
      "A calendar that thinks in sessions, with reminders and a one-switch open or closed books toggle",
      "An optional one-page website with booking built in, on the artist's own domain",
      "The full brand: script wordmark, warm palette, and custom tattoo-flash illustration",
    ],
    results: [
      { stat: "$29/mo", label: "flat, with no cut of deposits" },
      { stat: "0%", label: "taken from artist deposits or their clients" },
    ],
    tech: [
      { group: "Development", items: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"] },
      { group: "Auth & payments", items: ["NextAuth", "Stripe"] },
      { group: "Files & email", items: ["Cloudflare R2", "Resend"] },
      { group: "Infrastructure", items: ["Railway"] },
    ],
    gallery: [
      "/work/etchra-1.webp",
      "/work/etchra-2.webp",
      "/work/etchra-3.webp",
      "/work/etchra-4.webp",
      "/work/etchra-5.webp",
    ],
  },
  {
    slug: "cloud-clean-laundry",
    name: "Cloud Clean Laundry",
    tagline:
      "A laundry pickup service that books itself, sends the invoice, and gets paid, all from one app.",
    services: ["software", "websites", "brand"],
    brand: { field: "#0e4670", glow: "#58b4ea", tone: "light" },
    thumb: { kind: "screen", src: "/work/cloud-clean-1.webp" },
    url: "https://cloudcleanclt.com",
    status: "Live",
    meta: [
      { label: "Type", value: "Brand + web app" },
      { label: "For", value: "Cloud Clean · Charlotte, NC" },
      { label: "Year", value: "2026" },
      { label: "Stage", value: "Live" },
    ],
    overview:
      "Cloud Clean Laundry is a wash-and-fold pickup and delivery service in Charlotte, NC. \"We pick up. We wash. You relax.\" The owner needed more than a website. They needed the whole business to run from one place, so that's what we built: the brand, the marketing site, a booking flow, and an owner portal, in one app they actually own. No per-seat SaaS and no monthly tool stack.",
    challenge:
      "The owner wanted to take a pickup, confirm it, invoice it, and get paid, all from one place. No pile of monthly tools, no per-seat bill, and simple enough for one non-technical person to run solo.",
    solution:
      "One app the owner owns. Customers book a pickup as a guest, no account needed, so nothing slows a new customer down. Every request lands in the owner portal as a lead, and the owner runs the whole confirm-to-paid loop from there. Square handles invoices and payment, and a webhook marks things paid the moment they are. The marketing site, booking flow, and portal are all one codebase.",
    built: [
      "The brand and marketing site, built around the \"We pick up. We wash. You relax.\" voice",
      "Guest pickup booking with no account required",
      "An owner portal that turns every booking request into a lead and runs the confirm-to-paid loop",
      "Square Invoices integration that creates the customer, order, and invoice, then emails a hosted pay page",
      "A Square webhook that marks invoices paid and updates the booking in real time",
      "Deals and promos the owner posts from the portal, shown on the marketing site",
      "Booking confirmations and invoice emails through Resend",
    ],
    results: [
      { label: "Guest booking, no account required" },
      { label: "Confirm-to-paid in one owner portal" },
      { label: "No per-seat SaaS. One app the owner owns" },
    ],
    tech: [
      { group: "Development", items: ["Astro", "TypeScript", "Drizzle ORM", "PostgreSQL"] },
      { group: "Payments", items: ["Square"] },
      { group: "Email", items: ["Resend"] },
      { group: "Infrastructure", items: ["Railway"] },
    ],
    gallery: [
      "/work/cloud-clean-1.webp",
      "/work/cloud-clean-5.webp",
      "/work/cloud-clean-6.webp",
      "/work/cloud-clean-2.webp",
      "/work/cloud-clean-3.webp",
      "/work/cloud-clean-4.webp",
    ],
  },
  {
    slug: "kith",
    name: "Kith",
    tagline:
      "Snap a card, capture the lead, and let it draft warm, you-voiced follow-ups on a schedule.",
    services: ["software", "uiux", "brand"],
    brand: { field: "#43243a", glow: "#9a5a86", tone: "light" },
    thumb: { kind: "screen", src: "/work/kith-today.webp" },
    status: "Live",
    meta: [
      { label: "Type", value: "AI product" },
      { label: "For", value: "Founders & small teams" },
      { label: "Stage", value: "Live" },
    ],
    overview:
      "Kith turns a stack of business cards into a working pipeline. Snap a card and it captures the contact, then drafts warm, on-voice follow-ups on a schedule, so the leads you meet don't die in a spreadsheet.",
    challenge:
      "Founders and small teams collect leads constantly (events, referrals, DMs), but follow-up is manual, inconsistent, and the first thing to slip when the week gets busy.",
    solution:
      "An AI lead engine that does the boring part: read the card, structure the contact, and write personalized outreach that actually sounds like you, dripped out over days instead of dumped in one blast.",
    tech: [
      { group: "Development", items: ["Next.js", "TypeScript", "Prisma", "Postgres"] },
      { group: "AI", items: ["Groq", "Gemini"] },
      { group: "Infrastructure", items: ["Railway"] },
    ],
    gallery: ["/work/kith-today.webp", "/work/kith-leads.webp"],
    outcome:
      "Live and running a daily discovery-and-digest loop. Next up: multi-tenant, so any small team can run their own.",
  },
  {
    slug: "howpayrollworks",
    name: "HowPayrollworks",
    tagline:
      "Plain-language payroll help from someone who's run payroll for 26+ years, on a site he runs himself.",
    services: ["websites"],
    brand: { field: "#2343c4", glow: "#7c9cff", tone: "light" },
    thumb: {
      kind: "screen",
      src: "/work/howpayrollworks-1.webp",
      mobile: "/work/howpayrollworks-8.webp",
    },
    url: "https://howpayrollworks.com",
    status: "Live",
    meta: [
      { label: "Type", value: "Client website" },
      { label: "For", value: "Brian Escobar · HowPayrollworks" },
      { label: "Year", value: "2026" },
      { label: "Stage", value: "Live" },
    ],
    overview:
      "HowPayrollworks is plain-language payroll help from Brian Escobar, who has spent more than 26 years running payroll for companies from 1 to 10,000 employees. He needed a site that teaches first and books clients second, and one he could keep growing without a developer on call. We designed and built it: his services and pricing, his training program, a library of plain-language lessons, and booking right on the site. Then we launched it on his own accounts, so he owns every piece.",
    challenge:
      "Brian knows payroll inside and out, but he's one person. The site had to earn trust with people who are nervous about payroll, show up for the questions they actually type into Google and AI search, and take bookings, all without turning into a maintenance job. No database to babysit, no monthly CMS bill, and nothing he'd need a developer to change.",
    solution:
      "Keep it simple underneath so it can grow on top. The whole site lives in one GitHub repo, with every lesson, service, and FAQ stored as plain files. Brian edits through a friendly web editor, and we set up an AI-assisted writing workflow so he can research the questions people ask and publish the answers himself. The SEO and answer-engine groundwork went in from day one, and booking, paid sessions, and branded contact emails are all wired in.",
    built: [
      "A custom, mobile-first design and build in Astro, deployed on Railway",
      "A git-based CMS (Sveltia) so Brian edits lessons, videos, services, pricing, and FAQs himself",
      "An AI-assisted writing workflow for researching and publishing new lessons",
      "An SEO and AEO foundation: structured data for the business, Brian, articles, services, and FAQs, plus sitemap, canonicals, and metadata",
      "Booking built into the site, with four appointment types and payment on the paid ones",
      "Branded contact emails through Resend",
      "Logo guidance, a clean vector version of Brian's wordmark, and a brand guide",
      "Launched on Brian's own GitHub, hosting, and domain",
    ],
    results: [
      { stat: "100", label: "Lighthouse accessibility score on mobile, up from 93" },
      { stat: "2.8s", label: "for the main content to appear on mobile, down from 5.6s" },
      { label: "Brian owns and edits all of it, no developer required" },
    ],
    tech: [
      { group: "Development", items: ["Astro"] },
      { group: "Content", items: ["Sveltia CMS", "GitHub"] },
      { group: "Booking & email", items: ["Stripe", "Resend"] },
      { group: "Infrastructure", items: ["Railway"] },
    ],
    gallery: [
      "/work/howpayrollworks-1.webp",
      "/work/howpayrollworks-2.webp",
      "/work/howpayrollworks-3.webp",
      "/work/howpayrollworks-4.webp",
      "/work/howpayrollworks-5.webp",
      "/work/howpayrollworks-6.webp",
      "/work/howpayrollworks-7.webp",
      "/work/howpayrollworks-8.webp",
    ],
  },
  {
    slug: "hey-patch",
    name: "Hey Patch",
    tagline:
      "An AI front desk that answers, texts back, and books around the clock, for local service businesses.",
    services: ["software", "early-stage"],
    brand: { field: "#18172b", glow: "#7c5cff", tone: "light" },
    thumb: { kind: "screen", src: "/work/heypatch-site.webp" },
    meta: [
      { label: "Type", value: "AI product" },
      { label: "For", value: "Local service businesses" },
    ],
    overview:
      "Hey Patch is an AI front desk for local service businesses. It answers the texts and calls you miss, books appointments, and follows up, around the clock.",
    challenge:
      "Local service businesses lose real money to missed calls and slow replies. A receptionist is expensive, and most \"AI chatbots\" are generic and go off the rails.",
    solution:
      "A guardrails-first AI front desk. It handles the common asks (hours, booking, quotes), stays on script, and hands off to a human when it should. Multi-tenant, so each business gets its own.",
    tech: [
      { group: "Development", items: ["Node", "TypeScript"] },
      { group: "AI", items: ["Groq"] },
      { group: "Comms", items: ["Twilio"] },
      { group: "Infrastructure", items: ["Railway"] },
    ],
    gallery: ["/work/heypatch-site.webp"],
  },
  {
    slug: "rkg-therapy",
    name: "RKG Therapy",
    tagline:
      "A warm, disarming therapy practice site that makes booking feel less scary.",
    services: ["websites", "brand"],
    brand: { field: "#35205a", glow: "#a57cf0", tone: "light" },
    thumb: {
      kind: "screen",
      src: "/work/rkg-1.webp",
      inset: { left: 72, top: 46, width: 2720, srcWidth: 2864 },
    },
    meta: [
      { label: "Type", value: "Client website" },
      { label: "For", value: "RKG Therapy · Coral Springs, FL" },
      { label: "Year", value: "2026" },
    ],
    overview:
      "RKG Therapy is a Coral Springs practice offering individual, couples, and family therapy, in person and online. The brief was simple: feel human, not clinical.",
    challenge:
      "People looking for a therapist are often already anxious, and a cold, clinical site makes it worse. RKG needed to feel human the second you land, and to make booking feel like a small step instead of a leap.",
    solution:
      "Warm editorial design: bold serif type, lavender and cream, and copy written for first-timers. Every section, from services to rates to the conditions it treats, is written to lower the temperature instead of raising it.",
    built: [
      "Visual design with an editorial serif and script pairing, warm and not sterile",
      "A hero with a dual oval photo treatment and copy written for first-timers",
      "A services section breaking down individual, couples, and family therapy",
      "A rates and insurance page with transparent, scannable pricing",
      "A conditions section (anxiety, depression, trauma, bipolar, OCD, ADHD) written with care",
      "Contact form and appointment booking",
    ],
    tech: [
      { group: "Design", items: ["Figma"] },
      { group: "Development", items: ["Astro", "HTML/CSS/JS"] },
    ],
    gallery: [
      "/work/rkg-1.webp",
      "/work/rkg-2.webp",
      "/work/rkg-3.webp",
      "/work/rkg-4.webp",
    ],
  },
  {
    slug: "client-portal",
    name: "Client Portal",
    tagline:
      "Portal, admin, payments, contracts, and files in one custom system. The tool we run our own studio on.",
    services: ["software", "websites", "uiux"],
    brand: { field: "#2a3f1f", glow: "#7fa653", tone: "light" },
    thumb: { kind: "screen", src: "/work/portal-dashboard.webp" },
    url: "https://portal.elefoxstudio.com",
    status: "Live",
    meta: [
      { label: "Type", value: "Our product" },
      { label: "For", value: "elefox studio + our clients" },
      { label: "Year", value: "2026" },
      { label: "Stage", value: "Live · in daily use" },
    ],
    overview:
      "Most small studios cobble together five different tools to run the business, and clients feel every seam. We built one thing that does all of it. The client side gives every client a private space to track project status, sign contracts, pay invoices, grab files, and message us. The admin side is where we run clients, leads, quotes, projects, approvals, and settings. Fully branded and self-hosted.",
    challenge:
      "The goal was one place where a client tracks a project, signs, pays, and grabs files, with the studio running leads, quotes, projects, and approvals right behind it.",
    solution:
      "Two sides, one system. A client-facing portal and a full admin CRM behind it. Role-based access so clients only ever see their own data, Stripe for paying inside the portal, secure file handoff, and all of it self-hosted, so there are no per-seat fees to anyone.",
    built: [
      "Client portal: dashboard, project status tracker, contracts, invoices, files, messages, and approvals",
      "Admin panel: a full CRM with leads, clients, quotes, projects, contracts, invoices, and settings",
      "Stripe for paying invoices directly inside the portal",
      "Cloudflare R2 file storage for secure deliverable handoff and shared assets",
      "NextAuth with role-based access, so clients only ever see their own data",
      "Invites, invoice notifications, and approvals by email through Resend",
      "Fully responsive on desktop and mobile",
    ],
    results: [
      { label: "Client portal and admin CRM in one full-stack app" },
      { label: "Invoices paid inside the portal via Stripe" },
      { label: "Self-hosted on Railway, zero per-seat fees" },
    ],
    tech: [
      { group: "Development", items: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"] },
      { group: "Auth & payments", items: ["NextAuth", "Stripe"] },
      { group: "Files & email", items: ["Cloudflare R2", "Resend"] },
      { group: "Infrastructure", items: ["Railway"] },
    ],
    gallery: ["/work/portal-dashboard.webp", "/work/portal-leads.webp", "/work/portal-projects.webp"],
  },
  {
    slug: "cove",
    name: "Cove: Ocean Puzzles",
    tagline:
      "Four relaxing puzzle games in one cozy reef, designed and built in-house for iOS and Android.",
    services: ["mobile", "uiux", "brand"],
    brand: { field: "#0c2b4a", glow: "#3fc4d4", tone: "light" },
    thumb: {
      kind: "phones",
      screens: ["/work/cove-store-hub.webp", "/work/cove-store-blocks.webp"],
      ratio: "9 / 19.5",
    },
    meta: [
      { label: "Type", value: "Our product" },
      { label: "For", value: "Casual puzzle players" },
      { label: "Year", value: "2026" },
      { label: "Platforms", value: "iOS and Android" },
    ],
    overview:
      "Cove is a cozy little corner of the ocean packed with puzzles: four games in one app, so there's always something to play. We designed and built every piece of it, from the pixel-art brand and the four game modes to the sea-creature sticker album and the launch ad.",
    challenge:
      "Casual puzzle players have endless options. A new game has to be easy to pick up for a minute, calm enough to play for an hour, and give people a reason to come back tomorrow, with no account and no connection needed.",
    solution:
      "Four games in one app, each with its own hook: Tide Blocks for clearing lines, Reef Sudoku in three difficulties, Tide Pool for merging tiles and filling orders, and Word Tide with a fresh five-letter word every day. Everything earns shells and sticker packs toward one seasonal album of sea creatures, so every game counts toward the same collection.",
    built: [
      "Four puzzle games in one app: Tide Blocks, Reef Sudoku, Tide Pool, and Word Tide",
      "Reef Sudoku in easy, medium, and hard, with pencil notes and a 3-mistake challenge",
      "A fresh five-letter word every day, with streaks and daily rewards",
      "Shells and sticker packs that fill a seasonal album of sea-creature characters",
      "A calm ocean palette, gentle sound, and haptic feedback on every move",
      "Plays fully offline, with no account or sign-up",
      "The pixel-art brand, app icon, store screenshots, and launch ad",
    ],
    tech: [
      { group: "Development", items: ["React Native", "Expo", "TypeScript"] },
      { group: "Ads", items: ["Google AdMob"] },
      { group: "Platforms", items: ["iOS", "Android"] },
    ],
    gallery: [
      "/work/cove-store-hub.webp",
      "/work/cove-store-pool.webp",
      "/work/cove-store-blocks.webp",
      "/work/cove-store-sudoku.webp",
      "/work/cove-store-album.webp",
    ],
    galleryLayout: "phones",
    video: {
      src: "/work/cove-ad.mp4",
      poster: "/work/cove-ad-poster.webp",
      heading: "The launch ad.",
      body: "We made the launch ad too: a quick, phone-shot spot for Meta, starring our favorite playtester.",
    },
  },
  {
    slug: "lumi-salon",
    name: "Lumi Salon",
    tagline: "Booking and client management, built for salons and studios.",
    services: ["software", "brand"],
    brand: { field: "#cb5e41", glow: "#f3a684", tone: "light" },
    thumb: { kind: "screen", src: "/work/lumi-calendar.webp" },
    meta: [
      { label: "Type", value: "Industry CRM" },
      { label: "For", value: "Salons & studios" },
    ],
    overview:
      "Appointments, client history, and the whole front-of-house flow, all in one place.",
    tech: [
      { group: "Development", items: ["Next.js", "Prisma", "Postgres", "Railway"] },
    ],
    gallery: ["/work/lumi-calendar.webp", "/work/lumi-booking.webp", "/work/lumi-clients.webp"],
  },
  {
    slug: "chenoa-mcgee-design",
    name: "Chenoa McGee Design",
    tagline:
      "Fifteen years of design expertise, finally with a site to match, and an intake that brings in the right clients.",
    services: ["websites"],
    brand: { field: "#1d2f4d", glow: "#8fb3e6", tone: "light" },
    thumb: { kind: "screen", src: "/work/chenoa-1.webp" },
    url: "https://chenoamcgeedesign.com",
    status: "Live",
    meta: [
      { label: "Type", value: "Client website" },
      { label: "For", value: "Chenoa McGee · South Florida" },
      { label: "Year", value: "2026" },
      { label: "Stage", value: "Live" },
    ],
    overview:
      "Chenoa McGee is a South Florida graphic designer and developer with 15 years under her belt. She had the portfolio; she needed the site to match. The brief was elegance and conversion: a refined editorial look as polished as her work, paired with a six-step intake that helps clients self-qualify and arrive ready to go.",
    challenge:
      "She needed a site as polished as her work, and a way to bring in the right clients instead of every client.",
    solution:
      "A refined editorial design paired with a six-step intake that helps people self-qualify before the first call. Built in Astro so it stays fast and light.",
    built: [
      "Visual design and full layout in Figma",
      "An editorial hero with a photo treatment and credential callouts",
      "An about section with a quote card and supporting stats",
      "A six-step intake form with service selection and scoped pricing",
      "A front-end build in Astro: fast, light, no bloat",
    ],
    tech: [
      { group: "Design", items: ["Figma"] },
      { group: "Development", items: ["Astro", "HTML/CSS/JS"] },
    ],
    gallery: [
      "/work/chenoa-1.webp",
      "/work/chenoa-2.webp",
      "/work/chenoa-3.webp",
    ],
  },
  {
    slug: "realtor-crm",
    name: "RealtorCRM",
    tagline: "A CRM shaped to how realtors actually work their sphere.",
    services: ["software"],
    brand: { field: "#0f4a44", glow: "#3fd0b9", tone: "light" },
    thumb: { kind: "screen", src: "/work/realtor-crm.webp" },
    url: "https://realtor-demo.elefoxstudio.com",
    status: "Live",
    meta: [
      { label: "Type", value: "Industry CRM" },
      { label: "For", value: "Realtors" },
      { label: "Stage", value: "Live demo" },
    ],
    overview:
      "A CRM built in the realtor's language (sphere, referrals, and follow-ups) instead of a generic sales pipeline meant for someone else.",
    solution:
      "Relationship-first contact tracking, the realtor's own stages, and the follow-up nudges that keep a sphere warm.",
    tech: [
      { group: "Development", items: ["Next.js", "Prisma", "Postgres", "Railway"] },
    ],
    gallery: ["/work/realtor-crm.webp"],
  },
  {
    slug: "construction-crm",
    name: "Contractor CRM",
    tagline: "Jobs, crews, quotes, and invoices for contractors.",
    services: ["software"],
    brand: { field: "#7d3f03", glow: "#e0923a", tone: "light" },
    thumb: { kind: "screen", src: "/work/contractor-jobs.webp" },
    url: "https://contractor-demo.elefoxstudio.com",
    status: "Live",
    meta: [
      { label: "Type", value: "Industry CRM" },
      { label: "For", value: "Contractors" },
      { label: "Stage", value: "Live demo" },
    ],
    overview:
      "All the moving parts of a build, tracked without a whiteboard and three group texts.",
    tech: [
      { group: "Development", items: ["Next.js", "Prisma", "Postgres", "Railway"] },
    ],
    gallery: [
      "/work/contractor-dashboard.webp",
      "/work/contractor-jobs.webp",
      "/work/contractor-schedule.webp",
      "/work/contractor-invoices.webp",
    ],
  },
  {
    slug: "elefox-ledger",
    name: "Elefox Ledger",
    tagline:
      "Local-first expense, subscription, and startup-cost tracking for a small business's books.",
    services: ["software"],
    brand: { field: "#314b26", glow: "#8fbf62", tone: "light" },
    thumb: { kind: "screen", src: "/work/ledger-subscriptions.webp" },
    meta: [
      { label: "Type", value: "Internal tool" },
      { label: "For", value: "elefox studio LLC" },
    ],
    overview:
      "Local-first bookkeeping for a small business: expenses, subscriptions, and startup costs, tracked without handing your finances to a cloud SaaS.",
    challenge:
      "Off-the-shelf accounting tools are overkill for a solo studio, and they all want your financial data living on their servers.",
    solution:
      "A fast, local-first ledger. Log expenses and subscriptions, categorize them, and see where the money actually goes. Your data stays yours.",
    tech: [
      { group: "Development", items: ["Next.js", "Postgres", "Docker"] },
    ],
    gallery: ["/work/ledger-expenses.webp", "/work/ledger-subscriptions.webp", "/work/ledger-reports.webp"],
  },
];

/** Text + tag colors for a project's field. */
export function toneStyles(tone: Brand["tone"]) {
  return tone === "light"
    ? { text: "text-bone", tag: "border-bone/30 text-bone/90", sub: "text-bone/75" }
    : { text: "text-ink", tag: "border-ink/20 text-ink/70", sub: "text-graphite" };
}

/** The three shown in the homepage strip, in display order. */
export const featuredSlugs = ["cloud-clean-laundry", "etchra", "howpayrollworks"];
export const featuredProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

/** Projects tagged with a service, in grid order. */
export function projectsFor(serviceSlug: string): Project[] {
  return projects.filter((p) => p.services.includes(serviceSlug));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
