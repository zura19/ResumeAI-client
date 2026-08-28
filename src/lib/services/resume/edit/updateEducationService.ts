import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

interface EducationBody {
  university: string;
  degree?: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

export async function updateEducationService(
  generatedResumeId: string,
  educationId: string,
  education: EducationBody,
): PromiseResponseSuccess<EducationBody & { id: string }> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/education/${educationId}`, {
      ...patchHeadersCredentials,
      body: JSON.stringify(education),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update education");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
