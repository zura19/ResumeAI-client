import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API } from "../helpers";
import type { Payment } from "@/lib/types/payment";

export async function getUserPaymentsService(
  limit?: number,
): PromiseResponseSuccess<Payment[]> {
  try {
    const res = await fetch(`${API}/payment?limit=${limit || 1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to get user payments");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
