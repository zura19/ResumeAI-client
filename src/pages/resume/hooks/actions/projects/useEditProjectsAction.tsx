import useEditResume from "@/lib/hooks/useEditResume";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";
import { toast } from "sonner";

interface UseEditProjectsActionProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

type ProjectItem = AiGeneratedResume["projects"][0];

export default function useEditProjectsAction({
  resumeData,
  id,
  generatedResumeId,
}: UseEditProjectsActionProps) {
  const [projects, setProjects] = useState<AiGeneratedResume["projects"]>(
    resumeData.projects || [],
  );

  const { editResume, isPending } = useEditResume(id, generatedResumeId);

  function addProject(project: ProjectItem) {
    const existingProject = projects.find((item) => item.title === project.title);

    if (existingProject) {
      return toast.error("Education already exists.");
    }

    setProjects((previous) => [...previous, project]);
  }

  function deleteProject(project: ProjectItem) {
    setProjects((previous) => previous.filter((item) => item !== project));
  }

  function editProject(project: ProjectItem, index: number) {
    const existingProject = projects.at(index);

    if (!existingProject) {
      return;
    }

    const nextProjects = [...projects];
    nextProjects[index] = project;
    setProjects(nextProjects);
  }

  function saveProjects() {
    return editResume({
      ...resumeData,
      projects,
    });
  }

  return {
    projects,
    isPending,
    addProject,
    deleteProject,
    editProject,
    saveProjects,
  };
}
