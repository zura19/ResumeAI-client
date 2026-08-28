import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function updateSummaryService(
  generatedResumeId: string,
  summary: string,
): PromiseResponseSuccess<{ summary: string }> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/summary`, {
      ...patchHeadersCredentials,
      body: JSON.stringify({ summary }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update summary");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
