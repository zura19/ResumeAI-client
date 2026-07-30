import { API, postHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

interface ExperienceBody {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
}

export async function createExperienceService(
  generatedResumeId: string,
  experience: ExperienceBody,
): PromiseResponseSuccess<ExperienceBody & { id: string }> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/experience`, {
      ...postHeadersCredentials,
      body: JSON.stringify(experience),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create experience");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
