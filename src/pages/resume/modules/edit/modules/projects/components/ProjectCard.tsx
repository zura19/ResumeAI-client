import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Trash2Icon } from "lucide-react";
import { motion } from "framer-motion";
import ProjectsModal from "./ProjectModal";

interface props {
  proj: AiGeneratedResume["projects"][0];
  resumeId: string;
  deleteProject: (proj: AiGeneratedResume["projects"][0]) => void;
  editProject: (proj: AiGeneratedResume["projects"][0], index: number) => void;
  index: number;
}

export default function ProjectCard({
  proj,
  deleteProject,
  editProject,
  index,
}: props) {
  function edit(proj: AiGeneratedResume["projects"][0]) {
    editProject(proj, index);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        x: -400,
      }}
      transition={{ duration: 0.3, delay: index * 0.2 }}
      className="bg-muted rounded-lg py-2 px-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{proj.title}</h3>
        <div className="flex items-center gap-2">
          <ProjectsModal proj={proj} session="edit" editProject={edit} />
          <Button
            onClick={() => deleteProject(proj)}
            size={"icon-sm"}
            variant="destructive"
            className="size-6 rounded-sm"
          >
            <Trash2Icon className="size-3" />
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        {proj.technologies.map((tech) => (
          <p className="text-muted-foreground  text-sm" key={tech}>
            {tech}
          </p>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {proj.features.length} Features
      </p>
    </motion.div>
  );
}
