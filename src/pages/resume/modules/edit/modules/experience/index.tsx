import { AnimatePresence } from "framer-motion";
import SaveAlert from "../../components/SaveAlert";
import ExperienceModal from "./components/ExperienceModal";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import ExperienceCard from "./components/ExperienceCard";
import useEditExperienceAction from "@/pages/resume/hooks/actions/experience/useEditExperienceAction";
import useReorderExperience from "@/pages/resume/hooks/actions/experience/useReorderExperience";

interface props {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export default function Experience({
  resumeData,
  id,
  generatedResumeId,
}: props) {
  const {
    isPending,
    addExperience,
    deleteExperience,
    editExperience,
  } = useEditExperienceAction({
    resumeData,
    id,
    generatedResumeId,
  });

  const { reorderExperience, isReordering } = useReorderExperience({
    id,
    generatedResumeId,
  });

  return (
    <div className="space-y-4">
      <SaveAlert />

      <ExperienceModal
        addExperience={addExperience}
        session="create"
        isPending={isPending}
      />

      {resumeData.experience?.length === 0 && (
        <p className="text-center text-muted-foreground">
          No experience added yet. Click the button above to add your
          experience.
        </p>
      )}

      <AnimatePresence>
        {resumeData.experience.length > 0 &&
          resumeData.experience?.map((exp, i) => (
            <ExperienceCard
              deleteExperience={deleteExperience}
              editExperience={editExperience}
              reorderExperience={reorderExperience}
              key={exp.id}
              exp={exp}
              index={i}
              isPending={isPending || isReordering}
              isFirst={i === 0}
              isLast={i === resumeData.experience.length - 1}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
