import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";

export async function countSubscriptionsService(): PromiseResponseSuccess<{
  free: number;
  pro: number;
  enterprise: number;
}> {
  try {
    const res = await fetch(`${API}/admin/subscriptions/count`, {
      ...getCredentials,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch plan counts");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching plan counts:", error);
    throw error;
  }
}
