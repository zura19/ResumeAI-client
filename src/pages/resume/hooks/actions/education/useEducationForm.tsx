import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { formatResumeDate, parseResumeDate } from "@/pages/resume/utils/date";
import { useState } from "react";

type EducationItem = AiGeneratedResume["education"][0];

interface UseEducationFormProps {
  session: "edit" | "create";
  handleClose: () => void;
  addEducation?: (education: EducationItem) => Promise<unknown>;
  editEducation?: (payload: {
    educationId: string;
    education: EducationItem;
  }) => Promise<unknown>;
  edu?: EducationItem & { id?: string };
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
    edu?.endDate === "Present" || edu?.stillStudying === true,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isDisabled() {
    if (!university || !field || !startDate) {
      return true;
    }

    if (endDate.getTime() < startDate.getTime()) {
      return true;
    }

    return false;
  }

  async function handleSubmit() {
    const education = {
      university: university.trim(),
      degree: degree.trim(),
      fieldOfStudy: field.trim(),
      startDate: formatResumeDate(startDate),
      endDate: stillStudying ? "Present" : formatResumeDate(endDate),
      stillStudying,
    };

    setIsSubmitting(true);

    try {
      if (session === "create" && addEducation) {
        await addEducation(education as EducationItem);
      }

      if (session === "edit" && editEducation && edu?.id) {
        await editEducation({ educationId: edu.id, education: education as EducationItem });
      }

      handleClose();
    } finally {
      setIsSubmitting(false);
    }
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
    isSubmitting,
    handleSubmit,
  };
}
