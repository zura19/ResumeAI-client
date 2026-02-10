import type { User } from "@/lib/types/User";
import { API } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function cancelStatusService(): PromiseResponseSuccess<{
  allowCancel: boolean;
  user: User;
}> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const res = await fetch(`${API}/payment/cancel/status`, {
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
