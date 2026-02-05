export interface Plan {
  id: string;
  name: PlanName;
  priceMonthly: number;
  description: string;
  features: string[];
  recommended?: boolean;
  detailedDescription: string;
  additionalFeatures: string[];
}

export type PlanName = "free" | "pro" | "enterprise";
