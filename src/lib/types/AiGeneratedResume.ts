import type { PersonalInfo } from "./buildResumeTypes";

export interface AiGeneratedResume {
  summary: string;
  personalInfo: PersonalInfo;
  education: {
    id: string;
    order: string;
    university: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    stillStudying?: boolean;
  }[];
  experience: {
    id: string;
    order: string;
    company: string;
    position: string;
    responsibilities: string[];
    startDate: string;
    endDate?: string;
  }[];
  skills: {
    soft: string[];
    technical: string[];
    languages: string[];
  };
  projects: {
    id: string;
    order: number;
    title: string;
    technologies: string[];
    features: string[];
  }[];
}

export type ResumeType = "classic" | "modern" | "creative" | "executive";
