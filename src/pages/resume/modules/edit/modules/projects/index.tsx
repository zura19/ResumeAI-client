import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
// import EducationCard from "./components/EducationCard";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import FormButton from "@/components/shared/FormButton";
import SaveAlert from "../../components/SaveAlert";
import useEditResume from "@/lib/hooks/useEditResume";
import ProjectCard from "./components/ProjectCard";
import ProjectsModal from "./components/ProjectModal";

interface props {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export default function Projects({ resumeData, id, generatedResumeId }: props) {
  const [projects, setProjects] = useState<AiGeneratedResume["projects"]>(
    resumeData.projects || [],
  );

  const { editResume, isPending } = useEditResume(id, generatedResumeId);

  function addProject(proj: AiGeneratedResume["projects"][0]) {
    const isExistingProject = projects.find((e) => e.title === proj.title);
    if (isExistingProject) return toast.error("Education already exists.");
    setProjects((prev) => [...prev, proj]);
  }

  function deleteProject(proj: AiGeneratedResume["projects"][0]) {
    setProjects((prev) => prev.filter((e) => e !== proj));
  }

  function editProject(proj: AiGeneratedResume["projects"][0], index: number) {
    const findByIndex = projects.at(index);

    if (findByIndex) {
      const newProjects = [...projects];
      newProjects[index] = proj;
      setProjects(newProjects);
    }
  }

  return (
    <div className="space-y-4">
      <SaveAlert />

      <ProjectsModal session="create" addProject={addProject} />

      <AnimatePresence>
        {projects?.map((proj, i) => (
          <ProjectCard
            key={proj.title}
            proj={proj}
            index={i}
            resumeId={id}
            deleteProject={deleteProject}
            editProject={editProject}
          />
        ))}
      </AnimatePresence>
      <FormButton
        loadingText="Saving Projects..."
        loading={isPending}
        onClick={() => editResume({ ...resumeData, projects })}
      >
        Save Projects
      </FormButton>
    </div>
  );
}
