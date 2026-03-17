import { AnimatePresence } from "framer-motion";
import SaveAlert from "../../components/SaveAlert";
import ExperienceModal from "./components/ExperienceModal";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";
import FormButton from "@/components/shared/FormButton";
import useEditResume from "@/lib/hooks/useEditResume";
import { toast } from "sonner";
import ExperienceCard from "./components/ExperienceCard";

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
  const [experiences, setExperiences] = useState<
    AiGeneratedResume["experience"]
  >(resumeData.experience || []);

  const { editResume, isPending } = useEditResume(id, generatedResumeId);

  function addExperience(exp: AiGeneratedResume["experience"][0]) {
    const isExistingUniversity = experiences.find(
      (e) => e.company === exp.company,
    );
    const isExistingDegree = experiences.find(
      (e) => e.position === exp.position,
    );
    if (isExistingUniversity || isExistingDegree)
      return toast.error("Education already exists.");
    setExperiences((prev) => [...prev, exp]);
  }

  function deleteExperience(exp: AiGeneratedResume["experience"][0]) {
    setExperiences((prev) => prev.filter((e) => e !== exp));
  }

  function editExperience(
    exp: AiGeneratedResume["experience"][0],
    index: number,
  ) {
    const findByIndex = experiences.at(index);

    if (findByIndex) {
      const newExperiences = [...experiences];
      newExperiences[index] = exp;
      setExperiences(newExperiences);
    }
  }

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
        onClick={() => editResume({ ...resumeData, experience: experiences })}
      >
        Save Experience
      </FormButton>
    </div>
  );
}
