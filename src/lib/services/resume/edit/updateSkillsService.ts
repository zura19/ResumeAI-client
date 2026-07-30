import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

interface SkillsBody {
  technical: string[];
  soft: string[];
  languages: string[];
}

export async function updateSkillsService(
  generatedResumeId: string,
  skills: SkillsBody,
): PromiseResponseSuccess<SkillsBody> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/skills`, {
      ...patchHeadersCredentials,
      body: JSON.stringify(skills),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update skills");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
