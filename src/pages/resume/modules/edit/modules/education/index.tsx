import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import EducationCard from "./components/EducationCard";
import EducationModal from "./components/EducationModal";
import { AnimatePresence } from "framer-motion";
import FormButton from "@/components/shared/FormButton";
import SaveAlert from "../../components/SaveAlert";
import useEditEducationAction from "@/pages/resume/hooks/actions/education/useEditEducationAction";

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
    educations,
    isPending,
    addEducation,
    deleteEducation,
    editEducation,
    saveEducation,
  } = useEditEducationAction({
    resumeData,
    id,
    generatedResumeId,
  });

  return (
    <div className="space-y-4">
      <SaveAlert />

      <EducationModal session="create" addEducation={addEducation} />
      {educations?.length === 0 && (
        <p className="text-center text-muted-foreground">
          No education added yet. Click the button above to add your education.
        </p>
      )}
      <AnimatePresence>
        {educations.length > 0 &&
          educations?.map((edu, i) => (
            <EducationCard
              deleteEducation={deleteEducation}
              editEducation={editEducation}
              key={edu.university + edu.degree + edu.fieldOfStudy}
              edu={edu}
              index={i}
              resumeId={id}
            />
          ))}
      </AnimatePresence>
      <FormButton
        loadingText="Saving Education..."
        loading={isPending}
        onClick={saveEducation}
      >
        Save Education
      </FormButton>
    </div>
  );
}
