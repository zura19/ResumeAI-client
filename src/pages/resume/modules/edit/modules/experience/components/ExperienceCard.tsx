import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Trash2Icon } from "lucide-react";
import { motion } from "framer-motion";
import ExperienceModal from "./ExperienceModal";

interface props {
  exp: AiGeneratedResume["experience"][0];
  resumeId: string;
  deleteExperience: (edu: AiGeneratedResume["experience"][0]) => void;
  editExperience: (
    exp: AiGeneratedResume["experience"][0],
    index: number,
  ) => void;
  index: number;
}

export default function ExperienceCard({
  exp,
  deleteExperience,
  editExperience,
  index,
}: props) {
  console.log(exp);

  function edit(exp: AiGeneratedResume["experience"][0]) {
    editExperience(exp, index);
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
          <ExperienceModal exp={exp} session="edit" editExperience={edit} />
          <Button
            onClick={() => deleteExperience(exp)}
            size={"icon-sm"}
            variant="destructive"
            className="size-6 rounded-sm"
          >
            <Trash2Icon className="size-3" />
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
