import { useState } from "react";
import type { Experience } from "@/lib/types/buildResumeTypes";
import useBuildResume from "@/lib/store/buildResumeState";

export default function useExperienceStep() {
  const { nextStep, handleAddExperience, data } = useBuildResume();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [stillWorking, setStillWorking] = useState(false);

  function addExperience() {
    const experience: Experience = {
      company,
      position,
      description,
      startDate: startDate.toLocaleDateString(),
      endDate: stillWorking ? null : endDate.toLocaleDateString(),
      stillWorking,
    };

    handleAddExperience(experience);

    setCompany("");
    setPosition("");
    setDescription("");
    setStartDate(new Date());
    setEndDate(new Date());
  }

  const disabledAdd = !company || !position || !startDate || !endDate;

  function disabledNext() {
    if (data.experience.length === 0) return true;
    if (company || position || description) return true;
    return false;
  }

  return {
    data,
    nextStep,
    company,
    setCompany,
    position,
    setPosition,
    description,
    setDescription,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stillWorking,
    setStillWorking,
    addExperience,
    disabledAdd,
    disabledNext,
  };
}
