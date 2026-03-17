import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, postHeadersCredentials } from "../helpers";
import type { Message } from "@/lib/types/chat";

export async function sendMessageService(
  resumeId: string,
  message: string,
): PromiseResponseSuccess<Message> {
  try {
    const res = await fetch(`${API}/chat/${resumeId}`, {
      ...postHeadersCredentials,
      body: JSON.stringify({ message }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to send message");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
