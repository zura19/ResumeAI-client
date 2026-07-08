import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, postHeadersCredentials } from "../helpers";

export async function reconcileUserPaymentService(
  userId: string,
): PromiseResponseSuccess<boolean> {
  try {
    const res = await fetch(`${API}/payment/reconcile/${userId}`, {
      ...postHeadersCredentials,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message || "Failed to reconcile user");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error reconciling user:", error);
    throw error;
  }
}
