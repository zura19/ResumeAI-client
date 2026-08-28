import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function reorderProjectService(
  generatedResumeId: string,
  projectId: string,
  order: number,
): PromiseResponseSuccess<null> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/project/reorder/${projectId}`, {
      ...patchHeadersCredentials,
      body: JSON.stringify({ order }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to reorder project");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
