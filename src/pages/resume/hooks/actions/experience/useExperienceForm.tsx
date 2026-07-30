import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { generateResponsibilitieService } from "@/lib/services/ai/generateResponsibilitieService";
import { formatResumeDate, parseResumeDate } from "@/pages/resume/utils/date";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type ExperienceItem = AiGeneratedResume["experience"][0];

interface UseExperienceFormProps {
  session: "edit" | "create";
  handleClose: () => void;
  addExperience?: (experience: ExperienceItem) => Promise<unknown>;
  editExperience?: (payload: {
    experienceId: string;
    experience: ExperienceItem;
  }) => Promise<unknown>;
  exp?: ExperienceItem & { id?: string };
}

export default function useExperienceForm({
  exp,
  session,
  handleClose,
  addExperience,
  editExperience,
}: UseExperienceFormProps) {
  const [company, setCompany] = useState(exp?.company || "");
  const [position, setPosition] = useState(exp?.position || "");
  const [responsibilities, setResponsibilities] = useState(
    exp?.responsibilities || [],
  );
  const [startDate, setStartDate] = useState(
    exp?.startDate
      ? parseResumeDate(exp.startDate)
      : new Date(new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState(
    parseResumeDate(exp?.endDate),
  );
  const [stillWorking, setStillWorking] = useState(exp?.endDate === "Present");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: generateResponsibilitie, isPending: isGenerating } =
    useMutation({
      mutationFn: async () => {
        const data = await generateResponsibilitieService({
          company,
          position,
          responsibilities,
        });

        return data.data.responsibilitie;
      },
      onError: (error) => toast.error(error.message || "Failed to generate"),
    });

  function addResponsibility(value: string) {
    const nextValue = value.trim();

    if (!nextValue) return;

    setResponsibilities((prev) => [...prev, nextValue]);
  }

  function removeResponsibility(index: number) {
    setResponsibilities((prev) => prev.filter((_, current) => current !== index));
  }

  function updateResponsibility(index: number, value: string) {
    const nextValue = value.trim();

    if (!nextValue) return;

    setResponsibilities((prev) =>
      prev.map((item, current) => (current === index ? nextValue : item)),
    );
  }

  function isDisabled() {
    if (!company || !position || !responsibilities.length || !startDate) {
      return true;
    }

    if (endDate.getTime() < startDate.getTime()) {
      return true;
    }

    return false;
  }

  async function handleSubmit() {
    const experience = {
      company: company.trim(),
      position: position.trim(),
      responsibilities,
      startDate: formatResumeDate(startDate),
      endDate: stillWorking ? "Present" : formatResumeDate(endDate),
    };

    setIsSubmitting(true);

    try {
      if (session === "create" && addExperience) {
        await addExperience(experience as ExperienceItem);
      }

      if (session === "edit" && editExperience && exp?.id) {
        await editExperience({ experienceId: exp.id, experience: experience as ExperienceItem });
      }

      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    company,
    setCompany,
    position,
    setPosition,
    responsibilities,
    setResponsibilities,
    addResponsibility,
    removeResponsibility,
    updateResponsibility,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stillWorking,
    setStillWorking,
    generateResponsibilitie,
    isGenerating,
    isDisabled,
    isSubmitting,
    handleSubmit,
  };
}
