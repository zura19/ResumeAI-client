import type { ResumeType } from "@/lib/types/AiGeneratedResume";

export const resumeTypeConfig: Record<
  ResumeType,
  { label: string; className: string }
> = {
  classic: {
    label: "Classic",
    className: "bg-gray-400/10 text-gray-400 border-gray-400/25",
  },
  modern: {
    label: "Modern",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/25",
  },
  executive: {
    label: "Executive",
    className: "bg-emerald-500/15 text-emerald-500 border-emerald-500/25",
  },
  creative: {
    label: "Creative",
    className: "bg-pink-500/15 text-pink-400 border-pink-500/25",
  },
};
