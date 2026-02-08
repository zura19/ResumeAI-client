import { API } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import type { Subscription } from "@/lib/types/subscription";

export async function getSubscriptionDataService(): PromiseResponseSuccess<{
  subscription: Subscription;
  userActions: {
    aiCreditsThisMonth: number;
    generatedResumesThisMonth: number;
  };
}> {
  try {
    const res = await fetch(`${API}/subscription/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to create checkout");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
