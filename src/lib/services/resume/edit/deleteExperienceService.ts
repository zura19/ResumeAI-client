import { API } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function deleteExperienceService(
  generatedResumeId: string,
  experienceId: string,
): PromiseResponseSuccess<null> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/experience/${experienceId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete experience");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
