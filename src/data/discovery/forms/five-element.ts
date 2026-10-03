import type { FormDefinition } from "../types";

/**
 * Five Element, round two: the follow-up after the Oct 5, 2026 meeting.
 * Everything the final price and schedule depend on (her EHR, what each
 * tool costs, who bills claims, the payer mix, front-desk hours). The
 * May questionnaire stays at /discovery/five-element-wellness.
 */
export const fiveElementForm: FormDefinition = {
  slug: "five-element",
  title: "Five Element Wellness Center",
  subtitle: "The details behind your price",
  intro:
    "Thanks for sitting down with me. This is everything I need to turn the ranges in your proposal into one price and a real schedule. Fill in what you know and skip the rest, and feel free to hand the tools and costs part to your front desk. It saves as you go, so you can close it and come back anytime.",
  recipientName: "Dr. Monique Rodriguez",
  submitLabel: "Send it to Tiffany",
  thankYouMessage:
    "Thank you! I'll go through everything and come back within five business days with one price, a dated schedule, and the agreement. If I need anything else, I'll text or email you.",
  hideCallLink: true,
  sections: [
    {
      title: "Your practice today",
      description:
        "Here's what I have so far. Correct anything that's off, and rough numbers are perfect.",
      fields: [
        {
          type: "longText",
          name: "practice_corrections",
          label:
            "Two offices (Coral Springs and Weston), seven practitioners (two MDs and five acupuncture physicians), two care coordinators, and a mix of commercial insurance, PIP, Workers' Comp, VA, and cash. Anything missing or wrong?",
          rows: 3,
        },
        {
          type: "number",
          name: "visits_per_week",
          label: "About how many visits do you see in a typical week, both offices together?",
          min: 0,
          suffix: "visits a week",
        },
        {
          type: "number",
          name: "new_patients_per_month",
          label: "About how many new patients a month?",
          min: 0,
          suffix: "new patients a month",
        },
        {
          type: "number",
          name: "active_patients",
          label: "Roughly how many active patients do you have?",
          min: 0,
          suffix: "patients",
        },
      ],
    },
    {
      title: "What you use today, and what it costs",
      description:
        "This is what lets me show you real savings instead of guesses. Monthly amounts in dollars, all in, if you know them.",
      fields: [
        {
          type: "shortText",
          name: "ehr_name",
          label: "What do you chart in?",
          placeholder: "e.g., Jane, Unified Practice, Tebra, ChiroTouch, paper",
        },
        {
          type: "number",
          name: "ehr_cost",
          label: "What does it cost each month?",
          helpText: "Including per-practitioner fees and add-ons like insurance billing.",
          min: 0,
          suffix: "dollars a month",
        },
        {
          type: "shortText",
          name: "ehr_contract",
          label: "When does that contract renew or end?",
          placeholder: "e.g., month to month, renews March 2027",
        },
        {
          type: "number",
          name: "website_cost",
          label: "What do you pay for your website and online booking (Officite or WebMD PracticePro)?",
          min: 0,
          suffix: "dollars a month",
        },
        {
          type: "shortText",
          name: "website_contract",
          label: "When does the website contract renew or end?",
          placeholder: "e.g., month to month, renews in June",
        },
        {
          type: "number",
          name: "weave_cost",
          label: "What do you pay Weave each month, both offices together?",
          min: 0,
          suffix: "dollars a month",
        },
        {
          type: "multiChoice",
          name: "weave_uses",
          label: "What do you use Weave for?",
          choices: [
            { value: "phones", label: "Phones" },
            { value: "texting", label: "Two-way texting" },
            { value: "reminders", label: "Appointment reminders" },
            { value: "reviews", label: "Review requests" },
            { value: "payments", label: "Payments" },
            { value: "unsure", label: "Not sure" },
          ],
        },
        {
          type: "shortText",
          name: "weave_contract",
          label: "When does the Weave contract renew or end?",
          placeholder: "e.g., annual, renews in January",
        },
        {
          type: "longText",
          name: "other_tools",
          label: "Anything else you pay for that touches patients or the front desk?",
          placeholder: "Online forms, fax, an answering service, call tracking, email marketing, review tools...",
          rows: 3,
        },
        {
          type: "number",
          name: "other_tools_cost",
          label: "Roughly what do those add up to each month?",
          min: 0,
          suffix: "dollars a month",
        },
      ],
    },
    {
      title: "Charting",
      fields: [
        {
          type: "multiChoice",
          name: "who_charts",
          label: "Who writes notes?",
          layout: "checkbox",
          choices: [
            { value: "acupuncture", label: "Acupuncture physicians" },
            { value: "md", label: "Medical doctors" },
            { value: "nurse_ma", label: "Nurses or medical assistants" },
            { value: "other", label: "Someone else" },
          ],
        },
        {
          type: "shortText",
          name: "note_signing",
          label: "Who signs notes, and does anyone co-sign?",
        },
        {
          type: "singleChoice",
          name: "e_prescribing",
          label: "Do your physicians e-prescribe from your EHR?",
          layout: "radio",
          choices: [
            { value: "yes_controlled", label: "Yes, including controlled substances" },
            { value: "yes", label: "Yes, but nothing controlled" },
            { value: "no", label: "No" },
            { value: "unsure", label: "Not sure" },
          ],
        },
        {
          type: "yesNo",
          name: "labs_imaging",
          label: "Do you order labs or imaging through your EHR?",
        },
        {
          type: "singleChoice",
          name: "migration",
          label: "What should come over to the new system?",
          layout: "radio",
          choices: [
            { value: "patients", label: "The patient list (names, contact info, insurance)" },
            { value: "patients_visits", label: "The patient list plus visit history" },
            { value: "everything", label: "Everything, including full chart notes" },
            { value: "unsure", label: "Not sure yet" },
          ],
        },
        {
          type: "longText",
          name: "charting_frustrations",
          label: "What's the most frustrating part of charting today?",
          rows: 3,
        },
      ],
    },
    {
      title: "Insurance and billing",
      fields: [
        {
          type: "singleChoice",
          name: "claims_who",
          label: "Who submits your insurance claims?",
          layout: "radio",
          choices: [
            { value: "in_house", label: "We do it in-house" },
            { value: "billing_company", label: "An outside billing company" },
            { value: "mix", label: "A mix of both" },
            { value: "unsure", label: "Not sure" },
          ],
        },
        {
          type: "shortText",
          name: "billing_company",
          label: "If you use a billing company, which one, and what do they charge?",
          placeholder: "e.g., 6% of collections",
        },
        {
          type: "shortText",
          name: "claims_system",
          label: "What system do claims go out from?",
          placeholder: "e.g., the EHR, Office Ally, the billing company's system",
        },
        {
          type: "shortText",
          name: "revenue_mix",
          label: "Roughly how does your revenue split?",
          placeholder: "e.g., 40% insurance, 25% PIP, 10% Workers' Comp, 5% VA, 20% cash",
        },
        {
          type: "singleChoice",
          name: "medicare_medicaid",
          label: "Do you take Medicare or Medicaid?",
          choices: [
            { value: "medicare", label: "Medicare" },
            { value: "medicaid", label: "Medicaid" },
            { value: "both", label: "Both" },
            { value: "neither", label: "Neither" },
          ],
        },
        {
          type: "longText",
          name: "pip_services",
          label: "For accident (PIP) patients, which services and practitioners do you bill under PIP?",
          helpText: "This helps me send accident patients to the right practitioner when they book.",
          rows: 3,
        },
        {
          type: "longText",
          name: "billing_leaks",
          label: "Where does money slip through the cracks today?",
          placeholder: "Denied claims, missed PIP windows, unpaid balances, slow payment posting...",
          rows: 3,
        },
      ],
    },
    {
      title: "Payments and programs",
      fields: [
        {
          type: "shortText",
          name: "payment_processor",
          label: "What do patients pay with at the front desk?",
          placeholder: "e.g., a Square terminal, Weave Payments, Clover",
        },
        {
          type: "singleChoice",
          name: "private_club",
          label: "The Private Club membership",
          choices: [
            { value: "growing", label: "Active and growing" },
            { value: "small", label: "Active but small" },
            { value: "paused", label: "Paused" },
            { value: "stopped", label: "We stopped it" },
          ],
        },
        {
          type: "longText",
          name: "private_club_details",
          label: "If it's active, how are members billed, and what do they get?",
          rows: 2,
        },
        {
          type: "yesNo",
          name: "packages",
          label: "Do you sell packages or pre-paid plans, like acupuncture plans or Endermologie 10-packs?",
        },
        {
          type: "singleChoice",
          name: "herb_shop",
          label: "The online herb shop",
          choices: [
            { value: "regular", label: "Selling regularly" },
            { value: "occasional", label: "Occasional sales" },
            { value: "unused", label: "Not really used" },
          ],
        },
      ],
    },
    {
      title: "Your team and who sees what",
      fields: [
        {
          type: "longText",
          name: "team_roles",
          label: "Who will use the system, and what does each person handle?",
          placeholder: "e.g., 2 coordinators (scheduling, insurance checks), a biller, 7 practitioners, me",
          rows: 3,
        },
        {
          type: "singleChoice",
          name: "practitioner_offices",
          label: "Do practitioners work at one office or both?",
          choices: [
            { value: "one", label: "Mostly one office each" },
            { value: "both", label: "Several work at both" },
            { value: "mix", label: "A mix" },
          ],
        },
        {
          type: "longText",
          name: "access_limits",
          label: "Is there anything certain people shouldn't be able to see?",
          placeholder: "e.g., the front desk sees schedules but not chart notes; only I see revenue",
          rows: 2,
        },
      ],
    },
    {
      title: "Your front desk's week",
      description:
        "Best guesses are fine. These turn \"saves time\" into real dollars in your price.",
      fields: [
        {
          type: "number",
          name: "hours_requests",
          label: "Typing online appointment requests into the schedule",
          min: 0,
          suffix: "hours a week",
        },
        {
          type: "number",
          name: "hours_reminders",
          label: "Confirmation and reminder calls",
          min: 0,
          suffix: "hours a week",
        },
        {
          type: "number",
          name: "hours_insurance",
          label: "Checking insurance and chasing member IDs",
          min: 0,
          suffix: "hours a week",
        },
        {
          type: "number",
          name: "hours_intake",
          label: "Paper intake and re-entering patient information",
          min: 0,
          suffix: "hours a week",
        },
        {
          type: "number",
          name: "no_shows",
          label: "About how many no-shows or late cancellations in a typical week?",
          min: 0,
          suffix: "a week",
        },
        {
          type: "number",
          name: "coordinator_rate",
          label: "Roughly what a coordinator costs per hour, all in",
          helpText: "Only if you're comfortable sharing.",
          min: 0,
          suffix: "dollars an hour",
        },
      ],
    },
    {
      title: "What matters most",
      fields: [
        {
          type: "longText",
          name: "must_haves",
          label: "If the new system did three things brilliantly, what would they be?",
          rows: 3,
        },
        {
          type: "singleChoice",
          name: "fix_first",
          label: "What should we fix first?",
          layout: "radio",
          choices: [
            { value: "website_booking", label: "The website and online booking" },
            { value: "front_desk", label: "The front desk: texting, reminders, intake, insurance checks" },
            { value: "charting", label: "Charting" },
            { value: "billing", label: "Billing and claims" },
            { value: "unsure", label: "Not sure, help me decide" },
          ],
        },
        {
          type: "singleChoice",
          name: "payment_preference",
          label: "How would you rather pay for something like this?",
          layout: "radio",
          choices: [
            { value: "monthly", label: "A monthly plan with a small setup fee" },
            { value: "one_time", label: "A one-time build with a smaller monthly fee" },
            { value: "either", label: "Open to either" },
          ],
        },
        {
          type: "shortText",
          name: "budget",
          label: "Is there a budget you'd like to stay within?",
          helpText: "Optional. Monthly, one-time, or both.",
        },
        {
          type: "singleChoice",
          name: "timing",
          label: "When would you like the new system running?",
          choices: [
            { value: "asap", label: "As soon as possible" },
            { value: "3_months", label: "Within 3 months" },
            { value: "3_6_months", label: "In 3 to 6 months" },
            { value: "contract_end", label: "When a current contract ends" },
          ],
        },
        {
          type: "shortText",
          name: "decision_makers",
          label: "Does anyone else weigh in on this decision?",
        },
        {
          type: "longText",
          name: "anything_else",
          label: "Anything else I should know?",
          rows: 3,
        },
      ],
    },
    {
      title: "How to reach you",
      fields: [
        {
          type: "shortText",
          name: "contact_name",
          label: "Your name",
          required: true,
        },
        {
          type: "email",
          name: "contact_email",
          label: "Email",
          required: true,
        },
        {
          type: "phone",
          name: "contact_phone",
          label: "Best phone number",
        },
        {
          type: "singleChoice",
          name: "contact_preference",
          label: "Best way to follow up",
          choices: [
            { value: "email", label: "Email" },
            { value: "text", label: "Text" },
            { value: "call", label: "Call" },
          ],
        },
      ],
    },
  ],
};
