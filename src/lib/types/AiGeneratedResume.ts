import type { PersonalInfo } from "./buildResumeTypes";
import type { ResumeType as ResumeVariants } from "./resume";

export interface AiGeneratedResume {
  id?: string;
  version?: number;
  aiModel?: string;
  resumeId?: string;
  createdAt?: string;
  updatedAt?: string;
  summary: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skills;
  projects: Project[];
}
export interface Project {
  id?: string;
  order?: number;
  title: string;
  technologies: string[];
  features: string[];
}

export interface Education {
  id?: string;
  order?: string;
  university: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  stillStudying?: boolean;
}
export interface Experience {
  id?: string;
  order?: string;
  company: string;
  position: string;
  responsibilities: string[];
  technologies: string[];
  startDate: string;
  endDate?: string;
}

export interface Skills {
  soft: string[];
  technical: string[];
  languages: string[];
}

export type ResumeType = ResumeVariants;
