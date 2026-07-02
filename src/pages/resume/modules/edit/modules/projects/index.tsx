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

      {projects?.length === 0 && (
        <p className="text-center text-muted-foreground">
          No projects added yet. Click the button above to add your projects.
        </p>
      )}

      <AnimatePresence>
        {projects.length > 0 &&
          projects?.map((proj, i) => (
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
