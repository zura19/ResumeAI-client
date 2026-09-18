import { API } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function deleteLinkService(
  generatedResumeId: string,
  linkId: string,
): PromiseResponseSuccess<null> {
  try {
    const res = await fetch(
      `${API}/generated-resumes/${generatedResumeId}/link/${linkId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete link");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
