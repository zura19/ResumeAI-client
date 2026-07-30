import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

interface ExperienceBody {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
}

export async function updateExperienceService(
  generatedResumeId: string,
  experienceId: string,
  experience: ExperienceBody,
): PromiseResponseSuccess<ExperienceBody & { id: string }> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/experience/${experienceId}`, {
      ...patchHeadersCredentials,
      body: JSON.stringify(experience),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update experience");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
