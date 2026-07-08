import type { User } from "@/lib/types/User";
import { API } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export type CheckoutPaymentStatus = "PROCESSING" | "SUCCEEDED" | "FAILED";

export interface CheckoutStatusResponse {
  status: string;
  paymentStatus: CheckoutPaymentStatus | null;
  total: number | null;
  currency: string | null;
  last4: string | null;
  created: string | null;
  email?: string | null;
  isProcessed: boolean;
  user: User;
}

export class CheckoutStatusError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "CheckoutStatusError";
    this.status = status;
  }
}

export async function checkStatusService(
  sessionId: string,
): PromiseResponseSuccess<CheckoutStatusResponse> {
  try {
    const res = await fetch(`${API}/payment/status/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new CheckoutStatusError(
        error?.message || "Failed to check payment status",
        res.status,
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
