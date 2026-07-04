import { useState } from "react";
import useBuildResume from "@/lib/store/buildResumeState";

export default function useProjectsStep() {
  const { data, handleAddProject, nextStep } = useBuildResume();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const disabledAdd = !description || !title;

  function addProject() {
    handleAddProject({
      title,
      description,
    });
    setTitle("");
    setDescription("");
  }

  function disabledNext() {
    if (title || description) return true;
    return false;
  }

  return {
    data,
    nextStep,
    title,
    setTitle,
    description,
    setDescription,
    disabledAdd,
    disabledNext,
    addProject,
  };
}
