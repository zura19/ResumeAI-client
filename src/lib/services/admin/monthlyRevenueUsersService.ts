import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";

export async function monthlyRevenueUsersService(
  year: string,
): PromiseResponseSuccess<
  {
    month: string;
    revenue: number;
    users: number;
  }[]
> {
  try {
    const res = await fetch(`${API}/admin/monthly-stats?year=${year}`, {
      ...getCredentials,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch monthly revenue and users stats");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching monthly revenue and users stats:", error);
    throw error;
  }
}
