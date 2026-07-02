import { API, postHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function duplicateResumeService(
  resumeId: string,
  generatedId: string,
): PromiseResponseSuccess<{ resumeId: string }> {
  try {
    const res = await fetch(`${API}/resume/duplicate/${resumeId}/${generatedId}`, {
      ...postHeadersCredentials,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to duplicate resume");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error duplicating resume:", error);
    throw error;
  }
}
