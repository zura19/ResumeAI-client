import { API } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function deleteProjectService(
  generatedResumeId: string,
  projectId: string,
): PromiseResponseSuccess<null> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/project/${projectId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete project");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
