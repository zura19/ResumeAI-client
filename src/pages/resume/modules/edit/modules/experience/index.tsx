import { AnimatePresence } from "framer-motion";
import SaveAlert from "../../components/SaveAlert";
import ExperienceModal from "./components/ExperienceModal";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import FormButton from "@/components/shared/FormButton";
import ExperienceCard from "./components/ExperienceCard";
import useEditExperienceAction from "@/pages/resume/hooks/actions/experience/useEditExperienceAction";

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
    experiences,
    isPending,
    addExperience,
    deleteExperience,
    editExperience,
    saveExperience,
  } = useEditExperienceAction({
    resumeData,
    id,
    generatedResumeId,
  });

  return (
    <div className="space-y-4">
      <SaveAlert />

      <ExperienceModal addExperience={addExperience} session="create" />

      <AnimatePresence>
        {experiences?.map((exp, i) => (
          <ExperienceCard
            deleteExperience={deleteExperience}
            editExperience={editExperience}
            key={exp.company + exp.position}
            exp={exp}
            index={i}
            resumeId={id}
          />
        ))}
      </AnimatePresence>
      <FormButton
        loadingText="Saving Experience..."
        loading={isPending}
        onClick={saveExperience}
      >
        Save Experience
      </FormButton>
    </div>
  );
}
