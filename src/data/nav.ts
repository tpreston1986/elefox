export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Services",
    items: [
      { label: "Websites", href: "/services/websites" },
      { label: "Custom software", href: "/services/software" },
      { label: "Brand & marketing", href: "/services/brand" },
      { label: "AI & automation", href: "/services/ai" },
    ],
  },
  {
    heading: "Studio",
    items: [
      { label: "About", href: "/about" },
      { label: "The founder", href: "/about/founder" },
      { label: "Pricing", href: "/pricing" },
      { label: "Selected work", href: "/work" },
    ],
  },
  {
    heading: "Get in touch",
    items: [
      { label: "Start a project", href: "/contact" },
      { label: "Book a call", href: "/contact#book" },
      { label: "Client sign in", href: "/sign-in" },
    ],
  },
];
