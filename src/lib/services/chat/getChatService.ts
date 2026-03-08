import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";

interface PaymentsResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  id: string;
  invoice: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export async function getChat(
  resumeId: string,
): PromiseResponseSuccess<{ chat: PaymentsResponse[] }> {
  try {
    const res = await fetch(`${API}/chat/${resumeId}`, {
      ...getCredentials,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch Chat");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}
