import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { generateResponsibilitieService } from "@/lib/services/ai/generateResponsibilitieService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface UseExperienceFormProps {
  session: "edit" | "create";
  handleClose: () => void;
  addExperience?: (experience: AiGeneratedResume["experience"][0]) => void;
  editExperience?: (experience: AiGeneratedResume["experience"][0]) => void;
  exp?: AiGeneratedResume["experience"][0];
}

const convertStrToTime = (value: string) => {
  const [year, month, day] = value.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const timeToStr = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

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
      ? convertStrToTime(exp.startDate)
      : new Date(new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState(
    exp?.endDate ? convertStrToTime(exp.endDate) : new Date(),
  );
  const [stillWorking, setStillWorking] = useState(exp?.endDate === "Present");

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

  function handleSubmit() {
    const experience = {
      company,
      position,
      responsibilities,
      startDate: timeToStr(startDate),
      endDate: stillWorking ? "Present" : timeToStr(endDate),
    };

    if (session === "create" && addExperience) {
      addExperience(experience);
    }

    if (session === "edit" && editExperience) {
      editExperience(experience);
    }

    handleClose();
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
    handleSubmit,
  };
}
