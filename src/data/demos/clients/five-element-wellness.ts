import type { ClientDemoConfig } from "../types";

export const fiveElementWellness: ClientDemoConfig = {
  slug: "five-element",
  clientName: "Five Element Wellness Center",

  brand: {
    wordmark: "Five Element Wellness",
    // Palette pulled from 5ewc.com itself (CSS frequency analysis):
    //   primary brick red #99140c is overwhelmingly THE brand color (180 uses
    //   in their CSS); #6a0e08 is the darker pressed/hover state already in
    //   their styles; #c81a10 is the brighter accent variant.
    //   White bg + black text + #626262 muted gray + #dedede borders match
    //   their actual layout. Slate #60687a appears in their CSS as a subtle
    //   secondary touch.
    // Fonts: Montserrat (body, 80+ uses) + Quattrocento Sans (display, 42 uses)
    //   — their actual pairing, both already on Google Fonts.
    primary: "#99140c",
    primaryDeep: "#6a0e08",
    background: "#FFFFFF",
    surface: "#F9F9F9",
    text: "#1A1A1A",
    textMuted: "#626262",
    border: "#DEDEDE",
    accent: "#60687A",
    displayFont: "Quattrocento Sans",
    bodyFont: "Montserrat",
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
