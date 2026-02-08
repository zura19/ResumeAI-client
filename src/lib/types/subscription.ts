import type { Plan } from "./plan";

export interface Subscription {
  id: string;
  stripeSubscriptionId: string;
  status: string;
  currentPeriodStart?: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
  plan: Plan;
}
