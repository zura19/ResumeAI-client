import useEditResume from "@/lib/hooks/useEditResume";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";
import { toast } from "sonner";

interface UseEditExperienceActionProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

type ExperienceItem = AiGeneratedResume["experience"][0];

export default function useEditExperienceAction({
  resumeData,
  id,
  generatedResumeId,
}: UseEditExperienceActionProps) {
  const [experiences, setExperiences] = useState<AiGeneratedResume["experience"]>(
    resumeData.experience || [],
  );

  const { editResume, isPending } = useEditResume(id, generatedResumeId);

  function addExperience(experience: ExperienceItem) {
    const hasExistingCompany = experiences.find(
      (item) => item.company === experience.company,
    );
    const hasExistingPosition = experiences.find(
      (item) => item.position === experience.position,
    );

    if (hasExistingCompany || hasExistingPosition) {
      return toast.error("Education already exists.");
    }

    setExperiences((previous) => [...previous, experience]);
  }

  function deleteExperience(experience: ExperienceItem) {
    setExperiences((previous) => previous.filter((item) => item !== experience));
  }

  function editExperience(experience: ExperienceItem, index: number) {
    const existingExperience = experiences.at(index);

    if (!existingExperience) {
      return;
    }

    const nextExperiences = [...experiences];
    nextExperiences[index] = experience;
    setExperiences(nextExperiences);
  }

  function saveExperience() {
    return editResume({
      ...resumeData,
      experience: experiences,
    });
  }

  return {
    experiences,
    isPending,
    addExperience,
    deleteExperience,
    editExperience,
    saveExperience,
  };
}
