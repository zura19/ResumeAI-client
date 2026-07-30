import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import EducationCard from "./components/EducationCard";
import EducationModal from "./components/EducationModal";
import { AnimatePresence } from "framer-motion";
import SaveAlert from "../../components/SaveAlert";
import useEditEducationAction from "@/pages/resume/hooks/actions/education/useEditEducationAction";
import useReorderEducation from "@/pages/resume/hooks/actions/education/useReorderEducation";

interface props {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export default function Education({
  resumeData,
  id,
  generatedResumeId,
}: props) {
  const {
    isPending,
    addEducation,
    deleteEducation,
    editEducation,
  } = useEditEducationAction({
    resumeData,
    id,
    generatedResumeId,
  });

  const { reorderEducation, isReordering } = useReorderEducation({
    id,
    generatedResumeId,
  });

  return (
    <div className="space-y-4">
      <SaveAlert />

      <EducationModal
        session="create"
        addEducation={addEducation}
        isPending={isPending}
      />
      {resumeData.education?.length === 0 && (
        <p className="text-center text-muted-foreground">
          No education added yet. Click the button above to add your education.
        </p>
      )}
      <AnimatePresence>
        {resumeData.education.length > 0 &&
          resumeData.education?.map((edu, i) => (
            <EducationCard
              deleteEducation={deleteEducation}
              editEducation={editEducation}
              reorderEducation={reorderEducation}
              key={edu.id}
              edu={edu}
              index={i}
              isPending={isPending || isReordering}
              isFirst={i === 0}
              isLast={i === resumeData.education.length - 1}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
