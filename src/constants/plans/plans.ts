interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  //   buttonText: string;
  detailedDescription: string;
  additionalFeatures: string[];
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "/month",
    description: "For individuals getting started with resume building.",
    features: [
      "1 resume template",
      "Basic AI suggestions",
      "Export to PDF",
      "Email support",
    ],
    // buttonText: "Start Free",
    detailedDescription:
      "Perfect for job seekers who want to create a basic resume. Our free plan gives you access to essential tools to get started on your job search journey.",
    additionalFeatures: [
      "Access to 1 professional template",
      "Basic grammar and spelling corrections",
      "AI-powered content suggestions (5/month)",
      "Download as PDF",
      "Standard email support (48hr response)",
      "Resume stored for 30 days",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 12,
    period: "/month",
    description: "For professionals who need more power and flexibility.",
    features: [
      "All templates unlocked",
      "Advanced AI corrections",
      "Multiple export formats",
      "Priority support",
      "Unlimited revisions",
    ],
    recommended: true,
    // buttonText: "Upgrade to Pro",
    detailedDescription:
      "Unlock the full power of ResumeAI with our Pro plan. Get access to all premium templates, advanced AI features, and priority support to make your resume stand out.",
    additionalFeatures: [
      "Access to all 50+ premium templates",
      "Advanced AI content optimization",
      "Unlimited AI suggestions and corrections",
      "Export to PDF, DOCX, and TXT",
      "ATS optimization scanner",
      "Cover letter generator",
      "Priority email support (24hr response)",
      "Resume stored indefinitely",
      "LinkedIn profile optimization tips",
      "Interview preparation suggestions",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 29,
    period: "/month",
    description: "For teams and organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "SSO integration",
    ],
    recommended: false,
    // buttonText: "Contact Sales",
    detailedDescription:
      "Built for teams and enterprises who need centralized resume management, custom branding, and advanced collaboration features. Scale your hiring and career development programs.",
    additionalFeatures: [
      "Everything in Pro plan",
      "Team workspace with shared templates",
      "Custom branded templates",
      "Role-based access control",
      "API access for integrations",
      "SAML SSO integration",
      "Dedicated account manager",
      "Custom onboarding and training",
      "Analytics and reporting dashboard",
      "Bulk export and management",
      "99.9% uptime SLA",
      "Phone and video support",
    ],
  },
];

export function getPlanById(id: string): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}
