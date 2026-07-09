import type { User } from "@/lib/types/User";
import { API } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function cancelStatusService(): PromiseResponseSuccess<{
  isCanceled: boolean;
  user: User;
}> {
  try {
    const res = await fetch(`${API}/payment/cancel/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message || "Failed to check cancellation status");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
