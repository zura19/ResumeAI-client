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

export async function paymentsService(
  lastId?: string,
  limit?: number,
): PromiseResponseSuccess<{ payments: PaymentsResponse[]; hasMore: boolean }> {
  try {
    const params = new URLSearchParams({
      lastId: lastId || "",
      limit: limit?.toString() || "",
    });
    const res = await fetch(`${API}/admin/payments?${params.toString()}`, {
      ...getCredentials,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch payments");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}
