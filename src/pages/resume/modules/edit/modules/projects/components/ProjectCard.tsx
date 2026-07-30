import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Loader2Icon, Trash2Icon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectsModal from "./ProjectModal";

type ProjectItem = AiGeneratedResume["projects"][0];

interface props {
  proj: ProjectItem;
  isPending: boolean;
  deleteProject: (projectId: string) => Promise<unknown>;
  editProject: (payload: {
    projectId: string;
    project: ProjectItem;
  }) => Promise<unknown>;
  reorderProject: (payload: {
    projectId: string;
    order: number;
  }) => Promise<unknown>;
  isFirst: boolean;
  isLast: boolean;
  index: number;
}

export default function ProjectCard({
  proj,
  isPending,
  deleteProject,
  editProject,
  reorderProject,
  isFirst,
  isLast,
  index,
}: props) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!proj.id) return;
    setIsDeleting(true);
    try {
      await deleteProject(proj.id);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleMoveUp() {
    if (!proj.id || isFirst) return;
    await reorderProject({ projectId: proj.id, order: index - 1 });
  }

  async function handleMoveDown() {
    if (!proj.id || isLast) return;
    await reorderProject({ projectId: proj.id, order: index + 1 });
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
      className="bg-muted rounded-lg py-2 px-4 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{proj.title}</h3>
        <div className="flex items-center gap-2">
          <ProjectsModal
            proj={proj}
            session="edit"
            editProject={editProject}
            isPending={isPending}
          />
          <Button
            onClick={handleDelete}
            size={"icon-sm"}
            variant="destructive"
            className="size-6 rounded-sm"
            disabled={isPending || isDeleting}
          >
            {isDeleting ? (
              <Loader2Icon className="size-3 animate-spin" />
            ) : (
              <Trash2Icon className="size-3" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        {proj.technologies.map((tech) => (
          <p className="text-muted-foreground text-sm" key={tech}>
            {tech}
          </p>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {proj.features.length} Features
      </p>

      <div className="flex items-center gap-2 mt-2">
        <Button
          onClick={handleMoveUp}
          size="sm"
          variant="outline"
          className="flex-1 bg-background/50 flex items-center gap-2"
          disabled={isPending || isFirst}
        >
          Move Up <ArrowUpIcon className="size-3" />
        </Button>
        <Button
          onClick={handleMoveDown}
          size="sm"
          variant="outline"
          className="flex-1 bg-background/50 flex items-center gap-2"
          disabled={isPending || isLast}
        >
          Move Down <ArrowDownIcon className="size-3" />
        </Button>
      </div>
    </motion.div>
  );
}
