import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { AnimatePresence } from "framer-motion";
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
  const { isPending, addProject, deleteProject, editProject } =
    useEditProjectsAction({
      resumeData,
      id,
      generatedResumeId,
    });

  return (
    <div className="space-y-4">
      <SaveAlert />

      <ProjectsModal
        session="create"
        addProject={addProject}
        isPending={isPending}
      />

      {resumeData.projects?.length === 0 && (
        <p className="text-center text-muted-foreground">
          No projects added yet. Click the button above to add your projects.
        </p>
      )}

      <AnimatePresence>
        {resumeData.projects.length > 0 &&
          resumeData.projects?.map((proj, i) => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              index={i}
              isPending={isPending}
              deleteProject={deleteProject}
              editProject={editProject}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
