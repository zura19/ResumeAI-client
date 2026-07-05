import type { ResumeType } from "@/lib/types/AiGeneratedResume";

interface ResumeTypeDataProps {
  src: string;
  alt: string;
  type: ResumeType;
  delay: number;
}

export const resumeTypeData: ResumeTypeDataProps[] = [
  {
    src: "/resume/resume-modern.png",
    alt: "resume modern",
    type: "modern",
    delay: 0,
  },
  {
    src: "/resume/resume-classic.png",
    alt: "resume classic",
    type: "classic",
    delay: 0.2,
  },
  {
    src: "/resume/resume-creative.png",
    alt: "resume creative",
    type: "creative",
    delay: 0.4,
  },

  {
    src: "/resume/resume-executive.png",
    alt: "resume executive",
    type: "executive",
    delay: 0.6,
  },
];
