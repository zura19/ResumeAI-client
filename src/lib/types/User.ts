import type { PlanName } from "./plan";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  plan: PlanName;
}

export type Role = "user" | "admin";

export interface UserFull extends User {
  createdAt: string;
  updatedAt: string;
  stripeCustomerId: string | null;
  aiCreditsThisMonth: number;
  aiCreditsTotal: number;
  resumesThisMonth: number;

  subscriptionStatus: string;
}
