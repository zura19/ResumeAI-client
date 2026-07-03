import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { formatResumeDate, parseResumeDate } from "@/pages/resume/utils/date";
import { useState } from "react";

interface UseEducationFormProps {
  session: "edit" | "create";
  handleClose: () => void;
  addEducation?: (education: AiGeneratedResume["education"][0]) => void;
  editEducation?: (education: AiGeneratedResume["education"][0]) => void;
  edu?: AiGeneratedResume["education"][0];
}

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
      ? parseResumeDate(edu.startDate)
      : new Date(new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState(
    parseResumeDate(edu?.endDate),
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
      startDate: formatResumeDate(startDate),
      endDate: stillStudying ? "Present" : formatResumeDate(endDate),
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
