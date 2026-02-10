import type { PlanName } from "@/lib/types/plan";
import { API, postHeadersCredentials } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function createCheckoutService(
  plan: PlanName,
): PromiseResponseSuccess<{ sessionUrl: string; sessionId: string }> {
  try {
    const res = await fetch(`${API}/payment/checkout`, {
      ...postHeadersCredentials,
      body: JSON.stringify({ plan }),
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to create checkout");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
