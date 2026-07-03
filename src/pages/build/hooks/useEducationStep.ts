import { useState } from "react";
import type { Education } from "@/lib/types/buildResumeTypes";
import useBuildResume from "@/lib/store/buildResumeState";

export default function useEducationStep() {
  const { nextStep, handleAddEducation, data } = useBuildResume();

  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [stillStudying, setStillStudying] = useState(false);

  function addEducation() {
    const education: Education = {
      university,
      degree,
      fieldOfStudy,
      startDate: startDate.toLocaleDateString(),
      endDate: stillStudying ? null : endDate.toLocaleDateString(),
      stillStudying,
    };

    handleAddEducation(education);

    setUniversity("");
    setDegree("");
    setFieldOfStudy("");
    setStartDate(new Date());
    setEndDate(new Date());
    setStillStudying(false);
  }

  const disabledAdd =
    !university || !degree || !fieldOfStudy || !startDate || !endDate;

  function disabledNext() {
    if (data.education.length === 0) return true;
    if (university || degree || fieldOfStudy) return true;
    return false;
  }

  return {
    data,
    nextStep,
    university,
    setUniversity,
    degree,
    setDegree,
    fieldOfStudy,
    setFieldOfStudy,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stillStudying,
    setStillStudying,
    addEducation,
    disabledAdd,
    disabledNext,
  };
}
