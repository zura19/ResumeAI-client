import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { PersonalInfo } from "@/lib/types/buildResumeTypes";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function updatePersonalInfoService(
  generatedResumeId: string,
  personalInfo: PersonalInfo,
): PromiseResponseSuccess<PersonalInfo> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/personal-info`, {
      ...patchHeadersCredentials,
      body: JSON.stringify(personalInfo),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update personal info");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
