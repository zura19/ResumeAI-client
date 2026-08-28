import type { AiGeneratedResume } from "./AiGeneratedResume";

export interface Resume {
  id: string;
  type: ResumeType;
  title: string | null;
  generatedResumes: AiGeneratedResume[];
  createdAt: string;
  updatedAt: string;
}

export type ResumeType = "classic" | "modern" | "creative" | "executive";
