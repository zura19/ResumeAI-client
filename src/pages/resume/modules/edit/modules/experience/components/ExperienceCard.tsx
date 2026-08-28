import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Loader2Icon, Trash2Icon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import ExperienceModal from "./ExperienceModal";
import { useState } from "react";

type ExperienceItem = AiGeneratedResume["experience"][0];

interface props {
  exp: ExperienceItem;
  isPending: boolean;
  deleteExperience: (experienceId: string) => Promise<unknown>;
  editExperience: (payload: {
    experienceId: string;
    experience: ExperienceItem;
  }) => Promise<unknown>;
  reorderExperience: (payload: {
    experienceId: string;
    order: number;
  }) => Promise<unknown>;
  isFirst: boolean;
  isLast: boolean;
  index: number;
}

export default function ExperienceCard({
  exp,
  isPending,
  deleteExperience,
  editExperience,
  reorderExperience,
  isFirst,
  isLast,
  index,
}: props) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!exp.id) return;
    setIsDeleting(true);
    try {
      await deleteExperience(exp.id);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleMoveUp() {
    if (!exp.id || isFirst) return;
    await reorderExperience({ experienceId: exp.id, order: index - 1 });
  }

  async function handleMoveDown() {
    if (!exp.id || isLast) return;
    await reorderExperience({ experienceId: exp.id, order: index + 1 });
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
        <h3 className="font-semibold text-lg">{exp.company}</h3>
        <div className="flex items-center gap-2">
          <ExperienceModal
            exp={exp}
            session="edit"
            editExperience={editExperience}
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
      <div>
        <p className="text-sm text-muted-foreground">{exp.position}</p>
        <p className="text-xs text-muted-foreground">
          {exp.startDate} - {exp.endDate || "Present"}
        </p>
        <p className="text-xs text-muted-foreground">
          {exp.responsibilities.length} Responsibilities
        </p>
        {exp.technologies && exp.technologies.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {exp.technologies.length} Technologies
          </p>
        )}
      </div>

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
