import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";

interface TotalsResponse {
  users: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
  subscriptions: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
  monthlyRevenue: number;
  generatedResumes: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
  totalAiCreditsUsed: number;
}

export async function totalsService(): PromiseResponseSuccess<TotalsResponse> {
  try {
    const res = await fetch(`${API}/admin/totals`, {
      ...getCredentials,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch  totals");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching totals:", error);
    throw error;
  }
}
