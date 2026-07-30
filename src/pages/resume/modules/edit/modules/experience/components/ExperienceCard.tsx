import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { LoaderIcon, Trash2Icon } from "lucide-react";
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
  index: number;
}

export default function ExperienceCard({
  exp,
  isPending,
  deleteExperience,
  editExperience,
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
              <LoaderIcon className="size-3 animate-spin" />
            ) : (
              <Trash2Icon className="size-3" />
            )}
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{exp.position}</p>
      <p className="text-xs text-muted-foreground">
        {exp.startDate} - {exp.endDate || "Present"}
      </p>
      <p className="text-xs text-muted-foreground">
        {exp.responsibilities.length} Responsibilities
      </p>
    </motion.div>
  );
}
