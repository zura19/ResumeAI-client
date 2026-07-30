import { API, getCredentials } from "@/lib/services/helpers";
import type {
  AiGeneratedResume,
  ResumeType,
} from "@/lib/types/AiGeneratedResume";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export interface GeneratedResumeResponse extends AiGeneratedResume {
  id: string;
  aiModel: string;
  version: number;
  resumeId: string;
  createdAt: string;
  updatedAt: string;
}

export async function getResumeByIdService(id: string): PromiseResponseSuccess<{
  resume: {
    id: string;
    type: ResumeType;
    title: string | null;
    generatedResumes: GeneratedResumeResponse[];
    createdAt: string;
    updatedAt: string;
  };
}> {
  try {
    const res = await fetch(`${API}/resume/${id}`, {
      ...getCredentials,
    });

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to create resume");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
