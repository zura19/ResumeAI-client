import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";

interface UseExperienceFormProps {
  session: "edit" | "create";
  handleClose: () => void;
  addExperience?: (experience: AiGeneratedResume["experience"][0]) => void;
  editExperience?: (experience: AiGeneratedResume["experience"][0]) => void;
  exp?: AiGeneratedResume["experience"][0];
}

const convertStrToTime = (value: string) => new Date(value.replaceAll("/", "-"));
const timeToStr = (value: Date) => value.toLocaleDateString();

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
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stillWorking,
    setStillWorking,
    isDisabled,
    handleSubmit,
  };
}
