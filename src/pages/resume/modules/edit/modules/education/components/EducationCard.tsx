import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Trash2Icon } from "lucide-react";
import EducationModal from "./EducationModal";
import { motion } from "framer-motion";

interface props {
  edu: AiGeneratedResume["education"][0];
  resumeId: string;
  deleteEducation: (edu: AiGeneratedResume["education"][0]) => void;
  editEducation: (
    edu: AiGeneratedResume["education"][0],
    index: number,
  ) => void;
  index: number;
}

export default function EducationCard({
  edu,
  deleteEducation,
  editEducation,
  index,
}: props) {
  console.log(edu);

  function edit(edu: AiGeneratedResume["education"][0]) {
    editEducation(edu, index);
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
          <EducationModal edu={edu} session="edit" editEducation={edit} />
          <Button
            onClick={() => deleteEducation(edu)}
            size={"icon-sm"}
            variant="destructive"
            className="size-6 rounded-sm"
          >
            <Trash2Icon className="size-3" />
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
