import useEditResume from "@/lib/hooks/useEditResume";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";
import { toast } from "sonner";

interface UseEditEducationActionProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

type EducationItem = AiGeneratedResume["education"][0];

export default function useEditEducationAction({
  resumeData,
  id,
  generatedResumeId,
}: UseEditEducationActionProps) {
  const [educations, setEducations] = useState<AiGeneratedResume["education"]>(
    resumeData.education || [],
  );

  const { editResume, isPending } = useEditResume(id, generatedResumeId);

  function addEducation(education: EducationItem) {
    const hasExistingUniversity = educations.find(
      (item) => item.university === education.university,
    );
    const hasExistingDegree = educations.find(
      (item) => item.degree === education.degree,
    );

    if (hasExistingUniversity || hasExistingDegree) {
      return toast.error("Education already exists.");
    }

    setEducations((previous) => [...previous, education]);
  }

  function deleteEducation(education: EducationItem) {
    setEducations((previous) => previous.filter((item) => item !== education));
  }

  function editEducation(education: EducationItem, index: number) {
    const existingEducation = educations.at(index);

    if (!existingEducation) {
      return;
    }

    const nextEducations = [...educations];
    nextEducations[index] = education;
    setEducations(nextEducations);
  }

  function saveEducation() {
    return editResume({
      ...resumeData,
      education: educations,
    });
  }

  return {
    educations,
    isPending,
    addEducation,
    deleteEducation,
    editEducation,
    saveEducation,
  };
}
