import type { User } from "@/lib/types/User";
import { API } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

interface Res {
  status: string;
  total: number;
  currency: string | null;
  last4: string | null;
  created: Date;
  email?: string | null;
  isProcessed: boolean;
  user: User;
}

export async function checkStatusService(
  sessionId: string,
): PromiseResponseSuccess<Res> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const res = await fetch(`${API}/payment/status/${sessionId}`, {
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
