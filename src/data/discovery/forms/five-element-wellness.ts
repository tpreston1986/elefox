import type { FormDefinition } from "../types";

export const fiveElementWellnessForm: FormDefinition = {
  slug: "five-element-wellness",
  title: "Five Element Wellness Center",
  subtitle: "Discovery questionnaire",
  intro:
    "A short questionnaire to align before we put a proposal together. Fill in what you can. Anything you'd rather talk through, leave blank and we'll cover it on the call.",
  recipientName: "Dr. Monique Rodriguez",
  sections: [
    {
      title: "Confirm what I know about your practice",
      description:
        "Here's what I pulled together from our conversation and your site. Correct anything that's off.",
      fields: [
        {
          type: "longText",
          name: "practice_corrections",
          label:
            "Two locations (Coral Springs, Weston), 15+ years in operation, 7 practitioners across acupuncture and MD disciplines, accepting commercial insurance plus PIP/WC/VA, 2 patient care coordinators + intern + payroll specialist on the front office. Anything missing or wrong?",
          rows: 4,
        },
      ],
    },
    {
      title: "Current tools",
      description:
        "Which software runs your practice today? Brand names are fine.",
      fields: [
        {
          type: "shortText",
          name: "tool_scheduling",
          label: "Scheduling and CRM",
          placeholder: "e.g., Jane App, Acuity, Mindbody",
        },
        {
          type: "shortText",
          name: "tool_two_way_sms",
          label: "Two-way SMS with patients",
          placeholder: "Weave (confirmed) or something else?",
        },
        {
          type: "shortText",
          name: "tool_bulk_sms",
          label: "Bulk SMS marketing",
          placeholder: "e.g., SimpleTexting, Textedly",
        },
        {
          type: "shortText",
          name: "tool_email_marketing",
          label: "Email marketing (if separate)",
          placeholder: "e.g., Mailchimp, Constant Contact",
        },
        {
          type: "shortText",
          name: "tool_payment",
          label: "Payment processing",
          placeholder: "e.g., Stripe, Square, in-office terminal",
        },
        {
          type: "shortText",
          name: "tool_insurance",
          label: "Insurance billing / claims",
          placeholder: "e.g., Kareo, in-house, third-party biller",
        },
        {
          type: "longText",
          name: "tool_other",
          label: "Anything else that touches patient workflow?",
          rows: 2,
        },
      ],
    },
    {
      title: "Patient and revenue mix",
      description:
        "Rough estimates are perfect. No need to pull reports.",
      fields: [
        {
          type: "shortText",
          name: "mix_cash_vs_insurance",
          label: "Cash-pay vs insurance (rough %)",
          placeholder: "e.g., 30% cash / 70% insurance",
        },
        {
          type: "shortText",
          name: "mix_specialty_insurance",
          label:
            "Within insurance, what share is PIP / Worker's Comp / VA vs standard commercial?",
          placeholder: "e.g., 40% PIP/WC, 60% commercial",
        },
        {
          type: "number",
          name: "volume_active_patients",
          label: "Active patients on your contact list",
          suffix: "patients",
        },
        {
          type: "number",
          name: "volume_weekly_appointments",
          label: "Weekly appointments across both locations",
          suffix: "appointments / week",
        },
        {
          type: "number",
          name: "volume_monthly_sms",
          label: "Bulk SMS sent per month",
          suffix: "messages / month",
        },
      ],
    },
    {
      title: "Team and workflow",
      fields: [
        {
          type: "singleChoice",
          name: "practitioner_locations",
          label: "Are practitioners fixed to one location or shared?",
          layout: "pills",
          choices: [
            { value: "fixed", label: "Mostly fixed to one location" },
            { value: "shared", label: "Several work across both" },
            { value: "mixed", label: "A mix of both" },
          ],
        },
        {
          type: "shortText",
          name: "owner_bookings",
          label: "Who currently handles bookings?",
        },
        {
          type: "shortText",
          name: "owner_reminders",
          label: "Who currently handles appointment reminders?",
        },
        {
          type: "shortText",
          name: "owner_insurance_verification",
          label: "Who currently handles insurance verification?",
        },
        {
          type: "shortText",
          name: "owner_bulk_sms",
          label: "Who currently sends bulk SMS / marketing?",
        },
        {
          type: "longText",
          name: "workflow_frustrations",
          label: "What part of the current workflow frustrates your team most?",
          rows: 4,
        },
      ],
    },
    {
      title: "Billing and payments",
      fields: [
        {
          type: "singleChoice",
          name: "claims_handling",
          label: "How are insurance claims handled?",
          layout: "pills",
          choices: [
            { value: "self", label: "Submit them ourselves" },
            { value: "service", label: "Use a billing service" },
            { value: "third_party", label: "Third-party biller" },
            { value: "mixed", label: "A mix" },
          ],
        },
        {
          type: "singleChoice",
          name: "deposits_at_booking",
          label: "Do you take deposits at time of booking?",
          layout: "pills",
          choices: [
            { value: "yes", label: "Yes, always" },
            { value: "sometimes", label: "Sometimes" },
            { value: "no", label: "No, pay at visit" },
          ],
        },
        {
          type: "yesNo",
          name: "accepts_hsa_fsa",
          label: "Do you accept HSA / FSA cards?",
        },
      ],
    },
    {
      title: "Programs",
      fields: [
        {
          type: "singleChoice",
          name: "private_club_status",
          label: "Private Club membership program",
          layout: "pills",
          choices: [
            { value: "active", label: "Active and growing" },
            { value: "active_slow", label: "Active but slow" },
            { value: "dormant", label: "Dormant" },
          ],
        },
        {
          type: "longText",
          name: "private_club_details",
          label: "If active, how are members billed and what benefits do they receive?",
          rows: 3,
        },
        {
          type: "singleChoice",
          name: "retail_status",
          label: "Online herbal supplement / wellness retail shop",
          layout: "pills",
          choices: [
            { value: "active", label: "Actively selling" },
            { value: "occasional", label: "Some sales here and there" },
            { value: "dormant", label: "Dormant for now" },
          ],
        },
        {
          type: "longText",
          name: "corporate_wellness",
          label:
            "Corporate wellness: how does this work today? Who books, who pays?",
          rows: 3,
        },
      ],
    },
    {
      title: "Migration needs",
      description:
        "What needs to come over from your current systems into the new one.",
      fields: [
        {
          type: "yesNo",
          name: "migrate_patients",
          label: "Import historical patient list?",
        },
        {
          type: "yesNo",
          name: "migrate_appointments",
          label: "Import historical appointment history?",
        },
        {
          type: "longText",
          name: "migrate_other",
          label: "Other data we should bring over?",
          rows: 2,
        },
      ],
    },
    {
      title: "Success criteria",
      fields: [
        {
          type: "longText",
          name: "success_six_months",
          label:
            "What does \"this platform worked\" look like six months from launch?",
          rows: 4,
        },
        {
          type: "longText",
          name: "must_haves",
          label: "Top three must-have features for you personally",
          rows: 3,
        },
        {
          type: "longText",
          name: "nice_to_haves",
          label: "Anything you'd consider nice-to-have but cuttable?",
          rows: 3,
        },
      ],
    },
    {
      title: "Logistics",
      fields: [
        {
          type: "shortText",
          name: "kickoff_timing",
          label: "Preferred kickoff timing",
          placeholder: "e.g., next month, before Q3, no rush",
        },
        {
          type: "longText",
          name: "constraints",
          label:
            "Hard deadlines or constraints I should know about? (Budget cap, vendor contract renewal, etc.)",
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
          label: "Phone (optional)",
        },
        {
          type: "longText",
          name: "final_notes",
          label: "Anything else I should know before our call?",
          rows: 3,
        },
      ],
    },
  ],
};
