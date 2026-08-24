import { menuServices } from "./services";

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  /** Dropdown items (desktop mega-nav / mobile sub-list). */
  children?: NavItem[];
};

// Single source of truth for the service links used in BOTH the header
// dropdown and the footer. Keyword-rich anchor text on every page = the
// internal linking Google wants for these pages to rank.
export const serviceLinks: NavItem[] = menuServices.map((s) => ({
  label: s.name,
  href: `/services/${s.slug}`,
}));

export const primaryNav: NavItem[] = [
  { label: "Free Audit", href: "/audit" },
  { label: "What we do", href: "/services", children: serviceLinks },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "What we do",
    items: serviceLinks,
  },
  {
    heading: "Studio",
    items: [
      { label: "About", href: "/about" },
      { label: "The founder", href: "/about/founder" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Get in touch",
    items: [
      { label: "Free website audit", href: "/audit" },
      { label: "Start a project", href: "/contact" },
      { label: "Book a call", href: "/contact#book" },
      { label: "Client sign in", href: "/sign-in" },
    ],
  },
];
