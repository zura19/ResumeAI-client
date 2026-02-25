import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";
import type { Subscription } from "@/lib/types/subscription";

interface UserResponse {
  resumes: {
    id: string;
  }[];
  subscription: {
    status: Subscription["status"];
    plan: {
      name: string;
      totalResumes: number;
      aiCreditsPerMonth: number;
    };
  };
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  aiCreditsThisMonth: number;
  createdAt: string;
}

export async function usersService(
  lastId?: string,
  limit?: number,
): PromiseResponseSuccess<{ users: UserResponse[]; hasMore: boolean }> {
  try {
    const params = new URLSearchParams({
      lastId: lastId || "",
      limit: limit?.toString() || "",
    });
    const res = await fetch(`${API}/admin/users?${params.toString()}`, {
      ...getCredentials,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
