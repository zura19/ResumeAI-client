export interface Plan {
  id: string;
  name: PlanName;
  priceMonthly: number;
  totalResumes: number;
  aiCreditsPerMonth: number;
  description: string;
  features: string[];
  recommended?: boolean;
  detailedDescription: string;
  additionalFeatures: string[];
  stripeProductId: string;
  stripePriceId: string;
}

export type PlanName = "free" | "pro" | "enterprise";
