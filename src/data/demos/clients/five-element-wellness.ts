import type { ClientDemoConfig } from "../types";

export const fiveElementWellness: ClientDemoConfig = {
  slug: "five-element",
  clientName: "Five Element Wellness Center",

  brand: {
    wordmark: "Five Element Wellness",
    // Sage + warm cream + terracotta — deliberately distinct from elefox forest.
    // Swap once we pull her real brand assets.
    primary: "#5B7553",
    primaryDeep: "#3F5239",
    background: "#FAF6EE",
    surface: "#FFFFFF",
    text: "#1A1F1A",
    textMuted: "#5C625B",
    border: "#E8E3D6",
    accent: "#C97B5B",
    displayFont: "Cormorant Garamond",
    bodyFont: "Inter",
  },

  pitch: {
    coreProblem:
      "Replace three monthly SaaS subscriptions (scheduling, Weave, bulk SMS) with one branded platform",
    proposedTier: "Premier",
    tagline:
      "Acupuncture, integrative medicine, and manual therapy across Coral Springs and Weston",
  },

  locations: [
    {
      name: "Coral Springs",
      city: "Coral Springs, FL",
      phone: "(954) 657-8342",
      hours: "Mon–Fri, Sat by appt",
    },
    {
      name: "Weston",
      city: "Weston, FL",
      phone: "(954) 204-3124",
      hours: "Mon–Sat",
    },
  ],

  practitioners: [
    {
      name: "Dr. Monique G. Rodriguez",
      credentials: "L.Ac, D.Ac",
      role: "Founder & Clinical Director",
    },
    {
      name: "Dr. Alexander Landfield",
      credentials: "MD",
      role: "Medical Director",
    },
    {
      name: "Dr. Ana Ramirez",
      credentials: "MD, RN, L.Ac",
      role: "Acupuncture Physician",
    },
    {
      name: "Dr. Kelly Baron",
      credentials: "DAOM, L.Ac",
      role: "Acupuncture Physician",
    },
    {
      name: "Zara A. Hoyt",
      credentials: "AP",
      role: "Acupuncture Physician",
    },
    {
      name: "Lesley Ike",
      credentials: "L.Ac",
      role: "Acupuncture Physician",
    },
    {
      name: "Catherine Facciolli",
      credentials: "L.Ac",
      role: "Acupuncture Physician",
    },
  ],

  services: [
    { name: "Traditional Acupuncture", category: "Acupuncture", durationMinutes: 60 },
    { name: "Acupuncture for Chronic Pain", category: "Acupuncture", durationMinutes: 60 },
    { name: "Cupping Therapy", category: "Bodywork", durationMinutes: 45 },
    { name: "Manual Therapy", category: "Bodywork", durationMinutes: 60 },
    { name: "Sports Recovery", category: "Bodywork", durationMinutes: 60 },
    { name: "Fertility Treatment", category: "Specialized", durationMinutes: 75 },
    { name: "Neuropathy Treatment", category: "Specialized", durationMinutes: 60 },
    { name: "Weight Loss Program", category: "Specialized" },
    { name: "IV Infusion", category: "Integrative", durationMinutes: 45 },
    { name: "Peptide Therapy", category: "Integrative" },
    { name: "Homeopathic Injections", category: "Integrative" },
    { name: "Red Light Therapy", category: "Wellness", durationMinutes: 20 },
    { name: "Acupuncture Facelift", category: "Cosmetic", durationMinutes: 90 },
    { name: "Endermologie", category: "Cosmetic", durationMinutes: 45 },
    { name: "Mesolift", category: "Cosmetic", durationMinutes: 45 },
  ],
};
