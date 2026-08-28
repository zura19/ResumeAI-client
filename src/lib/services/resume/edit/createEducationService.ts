import { API, postHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

interface EducationBody {
  university: string;
  degree?: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

export async function createEducationService(
  generatedResumeId: string,
  education: EducationBody,
): PromiseResponseSuccess<EducationBody & { id: string }> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/education`, {
      ...postHeadersCredentials,
      body: JSON.stringify(education),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create education");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
