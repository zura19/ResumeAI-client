import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import EducationCard from "./components/EducationCard";
import { useState } from "react";
import EducationModal from "./components/EducationModal";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import FormButton from "@/components/shared/FormButton";
import SaveAlert from "../../components/SaveAlert";
import useEditResume from "@/lib/hooks/useEditResume";

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
  const [educations, setEducations] = useState<AiGeneratedResume["education"]>(
    resumeData.education || [],
  );

  const { editResume, isPending } = useEditResume(id, generatedResumeId);

  function addEducation(edu: AiGeneratedResume["education"][0]) {
    const isExistingUniversity = educations.find(
      (e) => e.university === edu.university,
    );
    const isExistingDegree = educations.find((e) => e.degree === edu.degree);
    if (isExistingUniversity || isExistingDegree)
      return toast.error("Education already exists.");
    setEducations((prev) => [...prev, edu]);
  }

  function deleteEducation(edu: AiGeneratedResume["education"][0]) {
    setEducations((prev) => prev.filter((e) => e !== edu));
  }

  function editEducation(
    edu: AiGeneratedResume["education"][0],
    index: number,
  ) {
    const findByIndex = educations.at(index);

    if (findByIndex) {
      const newEducations = [...educations];
      newEducations[index] = edu;
      setEducations(newEducations);
    }
  }

  return (
    <div className="space-y-4">
      <SaveAlert />

      <EducationModal session="create" addEducation={addEducation} />

      <AnimatePresence>
        {educations?.map((edu, i) => (
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
        onClick={() => editResume({ ...resumeData, education: educations })}
      >
        Save Education
      </FormButton>
    </div>
  );
}
