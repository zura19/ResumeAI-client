import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";

type ProjectItem = Omit<AiGeneratedResume["projects"][0], "id" | "order">;

interface UseProjectFormProps {
  session: "edit" | "create";
  handleClose: () => void;
  addProject?: (project: ProjectItem) => Promise<unknown>;
  editProject?: (payload: {
    projectId: string;
    project: ProjectItem;
  }) => Promise<unknown>;
  proj?: ProjectItem & { id?: string };
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isDisabled() {
    if (!title || !features.length) {
      return true;
    }

    return false;
  }

  async function handleSubmit() {
    const project = {
      title,
      features,
      technologies,
    };

    setIsSubmitting(true);

    try {
      if (session === "create" && addProject) {
        await addProject(project);
      }

      if (session === "edit" && editProject && proj?.id) {
        await editProject({ projectId: proj.id, project });
      }

      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    title,
    setTitle,
    features,
    setFeatures,
    technologies,
    setTechnologies,
    isDisabled,
    isSubmitting,
    handleSubmit,
  };
}
