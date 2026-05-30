// Content for the industry-specific CRM landing pages (paid-traffic targets).
// Each entry drives the shared CrmLandingPage template.

export type LandingTier = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export type LandingFeature = { title: string; body: string };
export type LandingFAQ = { q: string; a: string };
export type ProofChip = { label: string; value: string };
export type TourVideo = {
  src: string;
  poster: string;
  eyebrow?: string;
  heading: string;
  description?: string;
};

export type LandingData = {
  slug: string;
  /** Stored on the lead so we know which page converted them. */
  industry: string;
  /** Hidden `services` value posted to /api/contact. */
  serviceValue: string;

  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTail: string;
  subhead: string;
  proofChips: ProofChip[];
  bullets: string[];

  problemTitle: string;
  problemIntro: string;
  problems: string[];

  featuresTitle: string;
  featuresIntro: string;
  features: LandingFeature[];

  migrationsTitle: string;
  migrations: string[];

  tiersTitle: string;
  tiersIntro: string;
  tiers: LandingTier[];

  faqTitle: string;
  faqs: LandingFAQ[];

  finalHeading: string;

  /** Optional product walkthrough video, shown right after the problem section. */
  tourVideo?: TourVideo;

  formTitle: string;
  formSubtitle: string;
  toolLabel: string;
  toolPlaceholder: string;
};

const SHARED_CHIPS: ProofChip[] = [
  { label: "Build from", value: "$3,500" },
  { label: "Hosting", value: "$50/mo" },
  { label: "Team size", value: "No per-seat fees" },
  { label: "Live in", value: "4–6 weeks" },
];

export const realtor: LandingData = {
  slug: "crm-for-realtors",
  industry: "Real estate (realtor landing page)",
  serviceValue: "crm",

  metaTitle: "Custom CRM for Realtors",
  metaDescription:
    "A custom CRM built around how real estate actually works: your pipeline, your team, your closings. No per-seat fees, hosted by us, live in 4 to 6 weeks. Build from $3,500.",

  eyebrow: "Custom CRM for Realtors",
  headlineLead: "The CRM built for how ",
  headlineAccent: "real estate",
  headlineTail: " actually works.",
  subhead:
    "Every lead, deal, and follow-up in one place, built around your pipeline and your closings instead of a generic sales funnel. Your whole team included, no per-seat fees, hosted by us.",
  proofChips: SHARED_CHIPS,
  bullets: [
    "Full migration from your current CRM",
    "Built around how you actually work",
    "Your whole team, unlimited logins",
    "Works on your phone, between showings",
  ],

  problemTitle: "The tools you've tried weren't built for you.",
  problemIntro:
    "Off-the-shelf real estate CRMs make you bend to them. You end up with a system half your team ignores and a bill that climbs with every seat.",
  problems: [
    "You pay per seat, so adding an agent or assistant costs more every month.",
    "The pipeline doesn't match how your deals actually move.",
    "Half the features are bloat, and the ones you need are missing.",
    "Leads, notes, and follow-ups are scattered across apps and spreadsheets.",
    "Follow-ups slip through the cracks because nothing reminds you.",
    "You're renting it. Prices rise, features change, and you own nothing.",
  ],

  featuresTitle: "What you get.",
  featuresIntro:
    "A CRM shaped to your business: your pipeline stages, your fields, your follow-up cadence. Here's what's inside.",
  features: [
    {
      title: "Your real pipeline",
      body: "Lead, nurture, active, under contract, closed, whatever your stages are. Move deals through a board that matches how you actually work.",
    },
    {
      title: "Every contact in one place",
      body: "Buyers, sellers, past clients, referral partners. Searchable notes, full history, and the last time you talked, all on one screen.",
    },
    {
      title: "Automated follow-ups",
      body: "New lead, post-showing, under contract, post-close. The CRM reminds you or sends it for you, so nothing slips.",
    },
    {
      title: "Your whole team, no per-seat fees",
      body: "Agents, assistants, transaction coordinators. Role-based access so people see only what they should. Add as many as you want.",
    },
    {
      title: "Built for your phone",
      body: "Log a call from the car, check a deal between showings, text a client. Same app on mobile and desktop, nothing to install.",
    },
    {
      title: "Migrate everything",
      body: "Contacts, notes, tags, deals, properties. We move it all from your current tool so you start day one with your data intact.",
    },
  ],

  migrationsTitle: "Coming from one of these? We'll bring it all over.",
  migrations: [
    "Follow Up Boss",
    "kvCORE",
    "Top Producer",
    "LionDesk",
    "Wise Agent",
    "KW Command",
    "Chime",
    "BoomTown",
    "Real Geeks",
    "Spreadsheets",
  ],

  tiersTitle: "Straightforward pricing.",
  tiersIntro:
    "A one-time build, then low monthly hosting. No per-seat fees, ever.",
  tiers: [
    {
      name: "Starter",
      price: "$3,500",
      blurb: "The core CRM, built around your pipeline and migrated from your current tool.",
      features: [
        "Custom pipeline + contact fields",
        "Full migration from your current CRM",
        "Automated follow-up reminders",
        "Unlimited team logins",
        "Mobile-first, live in about 4 weeks",
      ],
    },
    {
      name: "Growth",
      price: "$5,000",
      featured: true,
      blurb: "Adds the marketing and automation layer on top of the core.",
      features: [
        "Everything in Starter",
        "Email + SMS follow-up automations",
        "Lead-capture forms for your site",
        "Light reporting dashboard",
        "Review request automation",
      ],
    },
    {
      name: "Full",
      price: "Custom",
      blurb: "Everything, plus integrations and a workflow strategy session.",
      features: [
        "Everything in Growth",
        "Integrations (MLS, Zapier, and more)",
        "Advanced reporting",
        "1:1 workflow strategy session",
      ],
    },
  ],

  faqTitle: "Quick answers.",
  faqs: [
    {
      q: "Can you migrate my contacts from my current CRM?",
      a: "Yes. Contacts, notes, tags, deals, and properties come over from Follow Up Boss, kvCORE, Top Producer, LionDesk, Wise Agent, and others. Send us an export on the call and we'll tell you exactly what transfers.",
    },
    {
      q: "Is there really no per-seat fee?",
      a: "Correct. You pay once for the build and a flat monthly hosting fee starting at $50. Add as many agents, assistants, and coordinators as you want, the price doesn't change.",
    },
    {
      q: "Does it work on my phone?",
      a: "Yes. The whole thing is mobile-first. Log a call, check a deal, or text a client from your phone between showings. No separate app to install.",
    },
    {
      q: "How long does it take to build?",
      a: "Usually 4 to 6 weeks. Week 1 is discovery, weeks 2 to 4 are build with weekly demos so you steer it, then migration and training, then you're live.",
    },
    {
      q: "Do I own it?",
      a: "Yes. It's built for you and it's yours. No vendor raising prices or changing features out from under you. We host and support it, but the system is yours.",
    },
    {
      q: "Do I need to be technical?",
      a: "No. We build the automations during setup so they run themselves, and we train you and your team on the parts you touch day to day.",
    },
  ],

  finalHeading: "See it built around your business.",

  formTitle: "Get a custom demo + quote",
  formSubtitle: "Tell us where you are now. We'll show you what it'd look like built for you, and what it'd cost. No pressure.",
  toolLabel: "What are you using now?",
  toolPlaceholder: "Follow Up Boss, Top Producer, a spreadsheet…",
};

export const contractor: LandingData = {
  slug: "crm-for-contractors",
  industry: "Contractor (contractor landing page)",
  serviceValue: "crm",

  metaTitle: "Custom CRM for Contractors",
  metaDescription:
    "A custom CRM built around how contractors actually work: estimates, jobs, scheduling, and invoices in one place. No per-seat fees, hosted by us, live in 4 to 6 weeks. Build from $3,500.",

  eyebrow: "Custom CRM for Contractors",
  headlineLead: "The CRM built for how ",
  headlineAccent: "contractors",
  headlineTail: " actually work.",
  subhead:
    "Estimates, jobs, scheduling, and invoices in one place, built around how your crew actually runs a job instead of a generic sales funnel. Your whole team included, no per-seat fees, hosted by us.",
  proofChips: SHARED_CHIPS,
  bullets: [
    "Quote to job to invoice in one place",
    "Built around your real workflow",
    "Your whole crew, unlimited logins",
    "Works in the field, on any phone",
  ],

  problemTitle: "The tools you've tried weren't built for you.",
  problemIntro:
    "Off-the-shelf contractor software makes you bend to it. You pay per user for features you don't use while the parts you actually need are missing.",
  problems: [
    "You pay per user, so every crew member you add costs more.",
    "Estimates, schedules, and invoices live in three different apps.",
    "The job workflow doesn't match how you actually run a project.",
    "Leads and callbacks slip because nothing reminds you to follow up.",
    "Your crew in the field can't easily update job status from a phone.",
    "You're renting it. Prices rise, features change, and you own nothing.",
  ],

  featuresTitle: "What you get.",
  featuresIntro:
    "A CRM shaped to your business: your job stages, your crews, your invoicing. Here's what's inside.",
  features: [
    {
      title: "Estimates to jobs",
      body: "Build a quote, send it, and turn it into a scheduled job the moment it's approved. No re-entering anything.",
    },
    {
      title: "Your real job workflow",
      body: "Lead, estimate, scheduled, in progress, complete, invoiced. A board that matches how your jobs actually move.",
    },
    {
      title: "Scheduling + crews",
      body: "See who's where, assign crews to jobs, and keep the calendar straight without a group-text chain.",
    },
    {
      title: "Invoices + payments",
      body: "Invoice straight from the job, take payment online, and see what's outstanding at a glance.",
    },
    {
      title: "Automated follow-ups",
      body: "New lead, sent estimate, job complete, review request. The CRM nudges you or sends it, so leads and reviews don't slip.",
    },
    {
      title: "Your whole crew, no per-seat fees",
      body: "Office staff, project managers, field crews. Role-based access, add as many as you want, one flat hosting fee.",
    },
  ],

  migrationsTitle: "Coming from one of these? We'll bring it all over.",
  migrations: [
    "Jobber",
    "Housecall Pro",
    "JobNimbus",
    "ServiceTitan",
    "Buildertrend",
    "Joist",
    "QuickBooks",
    "Spreadsheets",
  ],

  tiersTitle: "Straightforward pricing.",
  tiersIntro:
    "A one-time build, then low monthly hosting. No per-seat fees, ever.",
  tiers: [
    {
      name: "Starter",
      price: "$3,500",
      blurb: "The core CRM: estimates, jobs, and scheduling, migrated from your current tool.",
      features: [
        "Custom job pipeline + fields",
        "Estimates that convert to jobs",
        "Scheduling + crew assignment",
        "Full migration from your current tool",
        "Unlimited logins, live in about 4 weeks",
      ],
    },
    {
      name: "Growth",
      price: "$5,000",
      featured: true,
      blurb: "Adds invoicing, payments, and automation.",
      features: [
        "Everything in Starter",
        "Invoicing + online payments",
        "Email + SMS follow-up automations",
        "Lead-capture forms for your site",
        "Review request automation",
      ],
    },
    {
      name: "Full",
      price: "Custom",
      blurb: "Everything, plus integrations and a workflow strategy session.",
      features: [
        "Everything in Growth",
        "Integrations (QuickBooks, Zapier, and more)",
        "Advanced reporting",
        "1:1 workflow strategy session",
      ],
    },
  ],

  faqTitle: "Quick answers.",
  faqs: [
    {
      q: "Can you migrate my data from my current tool?",
      a: "Yes. Customers, jobs, estimates, and history come over from Jobber, Housecall Pro, JobNimbus, Buildertrend, spreadsheets, and others. Send us an export on the call and we'll tell you exactly what transfers.",
    },
    {
      q: "Is there really no per-seat fee?",
      a: "Correct. You pay once for the build and a flat monthly hosting fee starting at $50. Add as many office staff and field crew as you want, the price doesn't change.",
    },
    {
      q: "Can my crew use it in the field?",
      a: "Yes. It's mobile-first. Crews can check the schedule, update job status, and snap photos from any phone. No separate app to install.",
    },
    {
      q: "Can it handle invoicing and payments?",
      a: "Yes, on the Growth tier and up. Invoice straight from a job, take card or ACH online, and track what's outstanding. We can integrate with QuickBooks too.",
    },
    {
      q: "How long does it take to build?",
      a: "Usually 4 to 6 weeks. Week 1 is discovery, weeks 2 to 4 are build with weekly demos so you steer it, then migration and training, then you're live.",
    },
    {
      q: "Do I own it?",
      a: "Yes. It's built for you and it's yours. No vendor raising prices or changing features out from under you. We host and support it, but the system is yours.",
    },
  ],

  finalHeading: "See it built around your jobs.",

  formTitle: "Get a custom demo + quote",
  formSubtitle: "Tell us where you are now. We'll show you what it'd look like built for you, and what it'd cost. No pressure.",
  toolLabel: "What are you using now?",
  toolPlaceholder: "Jobber, Housecall Pro, a spreadsheet…",
};

export const general: LandingData = {
  slug: "custom-crm",
  industry: "General (CRM landing page)",
  serviceValue: "crm",

  metaTitle: "Custom CRM for Your Business",
  metaDescription:
    "A custom CRM built around how your business actually works: your pipeline, your team, your follow-ups. No per-seat fees, hosted by us, live in 4 to 6 weeks. Build from $3,500.",

  eyebrow: "Custom CRM",
  headlineLead: "The CRM built for how ",
  headlineAccent: "your business",
  headlineTail: " actually works.",
  subhead:
    "Every lead, customer, and follow-up in one place, built around how your business actually runs instead of a generic template. Your whole team included, no per-seat fees, hosted by us.",
  proofChips: SHARED_CHIPS,
  bullets: [
    "Full migration from your current tools",
    "Built around how you actually work",
    "Your whole team, unlimited logins",
    "Works anywhere, on any device",
  ],

  problemTitle: "The tools you've tried weren't built for you.",
  problemIntro:
    "Off-the-shelf CRMs make you bend to them. You pay per seat for features you don't use while the workflow never quite fits how you run things.",
  problems: [
    "You pay per seat, so every person you add costs more every month.",
    "The pipeline doesn't match how your business actually works.",
    "Half the features are bloat, and the ones you need are missing.",
    "Leads, notes, and follow-ups are scattered across apps and spreadsheets.",
    "Follow-ups slip through the cracks because nothing reminds you.",
    "You're renting it. Prices rise, features change, and you own nothing.",
  ],

  featuresTitle: "What you get.",
  featuresIntro:
    "A CRM shaped to your business: your pipeline stages, your fields, your follow-up cadence. Here's what's inside.",
  features: [
    {
      title: "Your real pipeline",
      body: "Whatever your stages are, from first contact to closed. Move deals through a board that matches how you actually work.",
    },
    {
      title: "Every contact in one place",
      body: "Leads, customers, partners. Searchable notes, full history, and the last time you talked, all on one screen.",
    },
    {
      title: "Automated follow-ups",
      body: "New lead, check-in, post-sale, renewal. The CRM reminds you or sends it for you, so nothing slips.",
    },
    {
      title: "Your whole team, no per-seat fees",
      body: "Owners, staff, contractors. Role-based access so people see only what they should. Add as many as you want.",
    },
    {
      title: "Works anywhere",
      body: "Desktop, tablet, phone. Update a deal, log a call, or message a customer from wherever you are. Nothing to install.",
    },
    {
      title: "Migrate everything",
      body: "Contacts, notes, history, deals. We move it all from your current tools so you start day one with your data intact.",
    },
  ],

  migrationsTitle: "Coming from one of these? We'll bring it all over.",
  migrations: [
    "HubSpot",
    "Salesforce",
    "Zoho",
    "Pipedrive",
    "monday.com",
    "Airtable",
    "Google Sheets",
    "Spreadsheets",
  ],

  tiersTitle: "Straightforward pricing.",
  tiersIntro:
    "A one-time build, then low monthly hosting. No per-seat fees, ever.",
  tiers: [
    {
      name: "Starter",
      price: "$3,500",
      blurb: "The core CRM, built around your workflow and migrated from your current tools.",
      features: [
        "Custom pipeline + contact fields",
        "Full migration from your current tools",
        "Automated follow-up reminders",
        "Unlimited team logins",
        "Mobile-first, live in about 4 weeks",
      ],
    },
    {
      name: "Growth",
      price: "$5,000",
      featured: true,
      blurb: "Adds the marketing and automation layer on top of the core.",
      features: [
        "Everything in Starter",
        "Email + SMS follow-up automations",
        "Lead-capture forms for your site",
        "Light reporting dashboard",
        "Review request automation",
      ],
    },
    {
      name: "Full",
      price: "Custom",
      blurb: "Everything, plus integrations and a workflow strategy session.",
      features: [
        "Everything in Growth",
        "Integrations (Zapier, QuickBooks, and more)",
        "Advanced reporting",
        "1:1 workflow strategy session",
      ],
    },
  ],

  faqTitle: "Quick answers.",
  faqs: [
    {
      q: "Can you migrate my data from my current tools?",
      a: "Yes. Contacts, notes, history, and deals come over from HubSpot, Salesforce, Zoho, Pipedrive, spreadsheets, and others. Send us an export on the call and we'll tell you exactly what transfers.",
    },
    {
      q: "Is there really no per-seat fee?",
      a: "Correct. You pay once for the build and a flat monthly hosting fee starting at $50. Add as many people as you want, the price doesn't change.",
    },
    {
      q: "Does it work on every device?",
      a: "Yes. It's mobile-first and runs in the browser on desktop, tablet, and phone. Nothing to install, same experience everywhere.",
    },
    {
      q: "How long does it take to build?",
      a: "Usually 4 to 6 weeks. Week 1 is discovery, weeks 2 to 4 are build with weekly demos so you steer it, then migration and training, then you're live.",
    },
    {
      q: "Do I own it?",
      a: "Yes. It's built for you and it's yours. No vendor raising prices or changing features out from under you. We host and support it, but the system is yours.",
    },
    {
      q: "Do I need to be technical?",
      a: "No. We build the automations during setup so they run themselves, and we train you and your team on the parts you touch day to day.",
    },
  ],

  finalHeading: "See it built around your business.",

  formTitle: "Get a custom demo + quote",
  formSubtitle: "Tell us where you are now. We'll show you what it'd look like built for you, and what it'd cost. No pressure.",
  toolLabel: "What are you using now?",
  toolPlaceholder: "HubSpot, a spreadsheet, sticky notes…",
};

export const therapist: LandingData = {
  slug: "crm-for-therapists",
  industry: "Therapy / mental health practice (therapist landing page)",
  serviceValue: "crm",

  metaTitle: "Custom CRM for Therapists & Small Practices",
  metaDescription:
    "A HIPAA-compliant custom CRM built around how your practice actually works: intake, scheduling, client records, notes, and billing. Hosted on AWS under a signed BAA. No per-clinician fees, live in 4 to 6 weeks. Build from $3,500.",

  eyebrow: "Custom CRM for Therapists & Practices",
  headlineLead: "The CRM built for how ",
  headlineAccent: "your practice",
  headlineTail: " actually works.",
  subhead:
    "Intake, scheduling, client records, notes, and billing in one place, built around how your practice actually runs instead of a one-size-fits-all platform. HIPAA-compliant and hosted on AWS under a signed BAA, your whole team included, no per-clinician fees.",
  proofChips: [
    { label: "Build from", value: "$3,500" },
    { label: "Compliance", value: "HIPAA-compliant" },
    { label: "Team size", value: "No per-clinician fees" },
    { label: "Live in", value: "4–6 weeks" },
  ],
  bullets: [
    "HIPAA-compliant, hosted on AWS (signed BAA)",
    "Intake to scheduling to billing, one place",
    "Built around how your practice runs",
    "Your whole team, no per-clinician fees",
  ],

  problemTitle: "The tools you've tried weren't built for your practice.",
  problemIntro:
    "Off-the-shelf practice software makes you bend to it. You pay per clinician for features you don't use, while the parts that actually fit how you work are missing.",
  problems: [
    "You pay per clinician, so growing your practice costs more every month.",
    "The big platforms do too much, and still not the part you actually need.",
    "Intake, scheduling, notes, and billing live in separate tools.",
    "New inquiries slip because nothing follows up for you.",
    "Client information is scattered across forms, inboxes, and spreadsheets.",
    "You're renting it. Prices rise, features change, and you own nothing.",
  ],

  featuresTitle: "What you get.",
  featuresIntro:
    "A system shaped to your practice: your intake questions, your scheduling, your notes, your billing. Here's what's inside.",
  features: [
    {
      title: "HIPAA-compliant by design",
      body: "Hosted on AWS under a signed Business Associate Agreement, with encryption in transit and at rest and role-based access. Client privacy is built into the foundation, not bolted on later.",
    },
    {
      title: "Intake, your way",
      body: "Custom intake forms that feed straight into a client record. No re-typing what someone already told you.",
    },
    {
      title: "Scheduling that fits",
      body: "Appointments, recurring sessions, and reminders that cut no-shows, matched to how you and your clinicians actually book.",
    },
    {
      title: "Every client in one place",
      body: "Contact details, history, session notes, and documents on one screen, searchable and organized the way you think.",
    },
    {
      title: "Notes + billing",
      body: "Long-form, searchable session notes, plus invoicing and superbills. The admin side handled without the busywork or a clunky platform.",
    },
    {
      title: "Your whole team, no per-clinician fees",
      body: "Clinicians, admins, billing staff. Role-based access so people see only what they should. Add as many as you want.",
    },
  ],

  migrationsTitle: "Coming from one of these? We'll bring it all over.",
  migrations: [
    "SimplePractice",
    "TherapyNotes",
    "Jane",
    "IntakeQ",
    "TheraNest",
    "Spreadsheets",
  ],

  tiersTitle: "Straightforward pricing.",
  tiersIntro:
    "A one-time build, then low monthly hosting. No per-clinician fees, ever.",
  tiers: [
    {
      name: "Starter",
      price: "$3,500",
      blurb: "The core system: intake, scheduling, and client records, migrated from your current tool.",
      features: [
        "Custom intake forms + client records",
        "Scheduling + appointment reminders",
        "Full migration from your current tool",
        "Unlimited team logins",
        "Mobile-first, live in about 4 weeks",
      ],
    },
    {
      name: "Growth",
      price: "$5,000",
      featured: true,
      blurb: "Adds notes, billing, and automation.",
      features: [
        "Everything in Starter",
        "Session notes + document storage",
        "Invoicing + superbills",
        "Email + SMS follow-up automations",
        "Intake forms embedded on your site",
      ],
    },
    {
      name: "Full",
      price: "Custom",
      blurb: "Everything, plus integrations and a workflow strategy session.",
      features: [
        "Everything in Growth",
        "Integrations (calendar, payments, and more)",
        "Advanced reporting",
        "1:1 workflow strategy session",
      ],
    },
  ],

  faqTitle: "Quick answers.",
  faqs: [
    {
      q: "Can you migrate my data from my current tool?",
      a: "Yes. Clients, intake info, notes, and history come over from SimplePractice, TherapyNotes, Jane, IntakeQ, TheraNest, spreadsheets, and others. Send us an export on the call and we'll tell you exactly what transfers.",
    },
    {
      q: "Is there really no per-clinician fee?",
      a: "Correct. You pay once for the build and a flat monthly hosting fee starting at $50. Add as many clinicians and admins as your practice needs, the price doesn't change.",
    },
    {
      q: "Is it HIPAA-compliant?",
      a: "Yes. It's hosted on AWS under a signed Business Associate Agreement (BAA), with encryption in transit and at rest, role-based access so staff only see what they should, and activity logging. Client privacy and HIPAA compliance are built into the foundation, not added on after.",
    },
    {
      q: "Does it work on every device?",
      a: "Yes. It's mobile-first and runs in the browser on desktop, tablet, and phone. Check your schedule, log a note, or send an invoice from wherever you are.",
    },
    {
      q: "How long does it take to build?",
      a: "Usually 4 to 6 weeks. Week 1 is discovery, weeks 2 to 4 are build with weekly demos so you steer it, then migration and training, then you're live.",
    },
    {
      q: "Do I own it?",
      a: "Yes. It's built for you and it's yours. No vendor raising prices or changing features out from under you. We host and support it, but the system is yours.",
    },
  ],

  finalHeading: "See it built around your practice.",

  tourVideo: {
    src: "/video/therapy-tour.mp4",
    poster: "/video/therapy-tour-poster.jpg",
    eyebrow: "A look inside",
    heading: "45 seconds, the whole practice.",
    description:
      "Schedule, client records, notes, intake, and billing, running the way a real practice does. Tap play and see it.",
  },

  formTitle: "Get a custom demo + quote",
  formSubtitle: "Tell us where you are now. We'll show you what it'd look like built for you, and what it'd cost. No pressure.",
  toolLabel: "What are you using now?",
  toolPlaceholder: "SimplePractice, TherapyNotes, a spreadsheet…",
};

export const landingPages = { realtor, contractor, general, therapist };
