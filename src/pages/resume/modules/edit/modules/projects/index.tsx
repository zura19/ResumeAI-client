import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
// import EducationCard from "./components/EducationCard";
import { AnimatePresence } from "framer-motion";
import FormButton from "@/components/shared/FormButton";
import SaveAlert from "../../components/SaveAlert";
import ProjectCard from "./components/ProjectCard";
import ProjectsModal from "./components/ProjectModal";
import useEditProjectsAction from "@/pages/resume/hooks/actions/projects/useEditProjectsAction";

interface props {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export default function Projects({ resumeData, id, generatedResumeId }: props) {
  const {
    projects,
    isPending,
    addProject,
    deleteProject,
    editProject,
    saveProjects,
  } = useEditProjectsAction({
    resumeData,
    id,
    generatedResumeId,
  });

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
        onClick={saveProjects}
      >
        Save Projects
      </FormButton>
    </div>
  );
}
