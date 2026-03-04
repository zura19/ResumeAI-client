import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";

interface TotalsResponse {
  users: totalAndMonths;
  subscriptions: totalAndMonths;
  totalRevenue: totalAndMonths;
  generatedResumes: totalAndMonths;
  totalAiCreditsUsed: number;
}

interface totalAndMonths {
  total: number;
  thisMonth: number;
  lastMonth: number;
}

export async function totalsService(): PromiseResponseSuccess<TotalsResponse> {
  try {
    const res = await fetch(`${API}/admin/totals`, {
      ...getCredentials,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch totals");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching totals:", error);
    throw error;
  }
}
