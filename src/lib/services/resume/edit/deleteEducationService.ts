import { API } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function deleteEducationService(
  generatedResumeId: string,
  educationId: string,
): PromiseResponseSuccess<null> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/education/${educationId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete education");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
