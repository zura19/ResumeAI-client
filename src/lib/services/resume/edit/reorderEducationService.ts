import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function reorderEducationService(
  generatedResumeId: string,
  educationId: string,
  order: number,
): PromiseResponseSuccess<null> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/education/reorder/${educationId}`, {
      ...patchHeadersCredentials,
      body: JSON.stringify({ order }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to reorder education");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
