import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";

interface UseEducationFormProps {
  session: "edit" | "create";
  handleClose: () => void;
  addEducation?: (education: AiGeneratedResume["education"][0]) => void;
  editEducation?: (education: AiGeneratedResume["education"][0]) => void;
  edu?: AiGeneratedResume["education"][0];
}

const convertStrToTime = (value: string) =>
  new Date(value.replaceAll("/", "-"));
const timeToStr = (value: Date) =>
  value.toISOString().split("T")[0].replaceAll("-", "/");

export default function useEducationForm({
  session,
  handleClose,
  addEducation,
  editEducation,
  edu,
}: UseEducationFormProps) {
  const [university, setUniversity] = useState(edu?.university || "");
  const [degree, setDegree] = useState(edu?.degree || "");
  const [field, setField] = useState(edu?.fieldOfStudy || "");
  const [startDate, setStartDate] = useState(
    edu?.startDate
      ? convertStrToTime(edu.startDate)
      : new Date(new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState(
    edu?.endDate ? convertStrToTime(edu.endDate) : new Date(),
  );
  const [stillStudying, setStillStudying] = useState(
    edu?.endDate === "Present",
  );

  function isDisabled() {
    if (!university || !field || !startDate) {
      return true;
    }

    if (endDate.getTime() < startDate.getTime()) {
      return true;
    }

    return false;
  }

  function handleSubmit() {
    const education = {
      university: university.trim(),
      degree: degree.trim(),
      fieldOfStudy: field.trim(),
      startDate: timeToStr(startDate),
      endDate: stillStudying ? "Present" : timeToStr(endDate),
    };

    if (session === "create" && addEducation) {
      addEducation(education);
    }

    if (session === "edit" && editEducation) {
      editEducation(education);
    }

    handleClose();
  }

  return {
    university,
    setUniversity,
    degree,
    setDegree,
    field,
    setField,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stillStudying,
    setStillStudying,
    isDisabled,
    handleSubmit,
  };
}
