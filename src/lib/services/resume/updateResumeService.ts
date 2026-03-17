import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import {
  API,
  postHeadersCredentials,
  putHeaders,
  // putHeadersCredentials,
} from "../helpers";

export async function updateResumeService(
  resumeId: string,
  generatedResumeId: string,
  data: Partial<AiGeneratedResume>,
): PromiseResponseSuccess<AiGeneratedResume> {
  try {
    const res = await fetch(`${API}/resume/${resumeId}/${generatedResumeId}`, {
      ...putHeaders,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update resume");
    }

    const updatedResume = await res.json();
    return updatedResume;
  } catch (error) {
    console.error("Error updating resume:", error);
    throw error;
  }
}

export async function updateSummaryService(
  resumeId: string,
  data: Partial<AiGeneratedResume>,
): PromiseResponseSuccess<{ summary: string }> {
  try {
    const res = await fetch(`${API}/resume/summary/${resumeId}`, {
      ...postHeadersCredentials,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update resume");
    }

    const updatedResume = await res.json();
    console.log("updatedResume from service:", updatedResume);
    return updatedResume;
  } catch (error) {
    console.error("Error updating resume:", error);
    throw error;
  }
}
