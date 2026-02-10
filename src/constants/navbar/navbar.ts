export interface NavbarItem {
  label: string;
  to: string;
  type: "btn" | "link";
}

export const navbarDataLandingPage: NavbarItem[] = [
  {
    label: "Features",
    to: "features",
    type: "btn",
  },

  {
    label: "How It Works",
    to: "how-it-works",
    type: "btn",
  },

  {
    label: "Templates",
    to: "templates",
    type: "btn",
  },

  {
    label: "Testimonials",
    to: "testimonials",
    type: "btn",
  },

  {
    label: "CTA",
    to: "cta",
    type: "btn",
  },

  {
    label: "Login",
    to: "/login",
    type: "link",
  },
];

export const navbarData: NavbarItem[] = [
  {
    label: "Home",
    to: "/",
    type: "link",
  },
  {
    label: "Build",
    to: "/build",
    type: "link",
  },
  {
    label: "Pricing",
    to: "/plans",
    type: "link",
  },
  {
    label: "Login",
    to: "/login",
    type: "link",
  },
];
