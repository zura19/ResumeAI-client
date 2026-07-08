import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";

export interface AdminSearchUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

interface SearchUsersParams {
  lastId?: string;
  limit?: number;
  search?: string;
}

export async function searchUsersService({
  lastId,
  limit = 10,
  search,
}: SearchUsersParams = {}): PromiseResponseSuccess<{
  users: AdminSearchUser[];
  hasMore: boolean;
}> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });

    if (lastId) params.set("lastId", lastId);
    if (search) params.set("search", search);

    const res = await fetch(`${API}/admin/search-users?${params.toString()}`, {
      ...getCredentials,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message || "Failed to fetch users");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}
