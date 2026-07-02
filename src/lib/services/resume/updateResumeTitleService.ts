import { API, putHeadersCredentials } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function updateResumeTitleService(
  resumeId: string,
  title: string | null,
): PromiseResponseSuccess<{ title: string | null }> {
  try {
    const res = await fetch(`${API}/resume/title/${resumeId}`, {
      ...putHeadersCredentials,
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update resume title");
    }

    const updatedResume = await res.json();
    return updatedResume;
  } catch (error) {
    console.error("Error updating resume title:", error);
    throw error;
  }
}
