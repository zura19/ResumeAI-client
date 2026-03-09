import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";
import type { Chat } from "@/lib/types/chat";

export async function getChatService(
  resumeId: string,
): PromiseResponseSuccess<Chat> {
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
    console.error("Error fetching Chat:", error);
    throw error;
  }
}
