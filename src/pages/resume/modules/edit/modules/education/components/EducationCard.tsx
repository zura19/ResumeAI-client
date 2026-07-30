import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { LoaderIcon, Trash2Icon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import EducationModal from "./EducationModal";
import { motion } from "framer-motion";
import { useState } from "react";

type EducationItem = AiGeneratedResume["education"][0];

interface props {
  edu: EducationItem;
  isPending: boolean;
  deleteEducation: (educationId: string) => Promise<unknown>;
  editEducation: (payload: {
    educationId: string;
    education: EducationItem;
  }) => Promise<unknown>;
  reorderEducation: (payload: {
    educationId: string;
    order: number;
  }) => Promise<unknown>;
  isFirst: boolean;
  isLast: boolean;
  index: number;
}

export default function EducationCard({
  edu,
  isPending,
  deleteEducation,
  editEducation,
  reorderEducation,
  isFirst,
  isLast,
  index,
}: props) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!edu.id) return;
    setIsDeleting(true);
    try {
      await deleteEducation(edu.id);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleMoveUp() {
    if (!edu.id || isFirst) return;
    await reorderEducation({ educationId: edu.id, order: index - 1 });
  }

  async function handleMoveDown() {
    if (!edu.id || isLast) return;
    await reorderEducation({ educationId: edu.id, order: index + 1 });
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
        <h3 className="font-semibold text-lg">
          {edu.degree ? `${edu.degree} in ` : ""} {edu.fieldOfStudy}
        </h3>
        <div className="flex items-center gap-2">
          <EducationModal
            edu={edu}
            session="edit"
            editEducation={editEducation}
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
      <div>
        <p className="text-sm text-muted-foreground">{edu.university}</p>
        <p className="text-xs text-muted-foreground">
          {edu.startDate} - {edu.endDate || "Present"}
        </p>
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
