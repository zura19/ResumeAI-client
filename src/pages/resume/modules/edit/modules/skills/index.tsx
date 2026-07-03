import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import FormButton from "@/components/shared/FormButton";
import SaveAlert from "../../components/SaveAlert";
import LanguagesSection from "./components/LanguagesSection";
import SoftSkillsSection from "./components/SoftSkillsSection";
import TechnicalSkillsSection from "./components/TechnicalSkillsSection";
import useEditSkillsAction from "@/pages/resume/hooks/actions/useEditSkillsAction";

interface props {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export default function Skills({ resumeData, id, generatedResumeId }: props) {
  const {
    skillsData,
    softSkill,
    setSoftSkill,
    language,
    setLanguage,
    technical,
    setTechnical,
    disableAdd,
    isPending,
    allowSave,
    handleAdd,
    handleRemoveSkillAtIndex,
    handleUpdateSkill,
    handleSaveSkills,
  } = useEditSkillsAction({
    resumeData,
    id,
    generatedResumeId,
  });

  return (
    <div className="pb-0 flex flex-col  gap-10 px-1">
      <SaveAlert />

      <SoftSkillsSection
        value={softSkill}
        skills={skillsData.soft}
        disabled={disableAdd("soft")}
        setValue={setSoftSkill}
        onAdd={() => handleAdd("soft")}
        onRemove={handleRemoveSkillAtIndex}
        onUpdate={handleUpdateSkill}
      />

      <LanguagesSection
        value={language}
        skills={skillsData.languages}
        disabled={disableAdd("languages")}
        setValue={setLanguage}
        onAdd={() => handleAdd("languages")}
        onRemove={handleRemoveSkillAtIndex}
        onUpdate={handleUpdateSkill}
      />

      <TechnicalSkillsSection
        value={technical}
        skills={skillsData.technical}
        disabled={disableAdd("technical")}
        setValue={setTechnical}
        onAdd={() => handleAdd("technical")}
        onRemove={handleRemoveSkillAtIndex}
        onUpdate={handleUpdateSkill}
      />
      <FormButton
        onClick={handleSaveSkills}
        loading={isPending}
        type="button"
        className="w-fit"
        disabled={
          !allowSave ||
          isPending ||
          softSkill !== "" ||
          language !== "" ||
          technical !== ""
        }
      >
        Save Skills
      </FormButton>
    </div>
  );
}
