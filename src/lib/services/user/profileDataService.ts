import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";
import type { ResumeType } from "@/lib/types/AiGeneratedResume";
import type { UserFull } from "@/lib/types/User";

interface ProfileDataResponse {
  user: UserFull;
  resumes: { id: string; type: ResumeType; title: string; createdAt: string }[];
  totals: {
    totalTransactions: number;
    totalResumes: number;
    totalAiCredits: number;
  };
}

export async function getProfileDataService(): PromiseResponseSuccess<ProfileDataResponse> {
  try {
    const res = await fetch(`${API}/user/profile`, {
      ...getCredentials,
    });

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to get profile data");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
