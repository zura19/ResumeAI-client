import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";

interface UseProjectFormProps {
  session: "edit" | "create";
  handleClose: () => void;
  addProject?: (project: AiGeneratedResume["projects"][0]) => void;
  editProject?: (project: AiGeneratedResume["projects"][0]) => void;
  proj?: AiGeneratedResume["projects"][0];
}

export default function useProjectForm({
  session,
  handleClose,
  addProject,
  editProject,
  proj,
}: UseProjectFormProps) {
  const [title, setTitle] = useState<string>(proj?.title || "");
  const [features, setFeatures] = useState<string[]>(proj?.features || []);
  const [technologies, setTechnologies] = useState<string[]>(
    proj?.technologies || [],
  );

  function isDisabled() {
    if (!title || !features.length || !technologies.length) {
      return true;
    }

    return false;
  }

  function handleSubmit() {
    const project = {
      title,
      features,
      technologies,
    };

    if (session === "create" && addProject) {
      addProject(project);
    }

    if (session === "edit" && editProject) {
      editProject(project);
    }

    handleClose();
  }

  return {
    title,
    setTitle,
    features,
    setFeatures,
    technologies,
    setTechnologies,
    isDisabled,
    handleSubmit,
  };
}
