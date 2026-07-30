import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { LoaderIcon, Trash2Icon } from "lucide-react";
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
  index: number;
}

export default function EducationCard({
  edu,
  isPending,
  deleteEducation,
  editEducation,
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
      <p className="text-sm text-muted-foreground">{edu.university}</p>
      <p className="text-xs text-muted-foreground">
        {edu.startDate} - {edu.endDate || "Present"}
      </p>
    </motion.div>
  );
}
