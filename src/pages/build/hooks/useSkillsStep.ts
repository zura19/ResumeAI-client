import type { skillType } from "@/lib/types/buildResumeTypes";
import useBuildResume from "@/lib/store/buildResumeState";

export default function useSkillsStep() {
  const {
    nextStep,
    handleAddSkill,
    handleRemoveSkill,
    handleUpdateSkill,
    data,
  } = useBuildResume();

  function handleAdd(type: skillType, skill: string) {
    if (type === "soft") handleAddSkill(type, skill);

    if (type === "languages") handleAddSkill(type, skill);

    if (type === "technical") handleAddSkill(type, skill);
  }

  function allowNext() {
    return (
      data.skills.soft.length >= 3 &&
      data.skills.languages.length >= 1 &&
      data.skills.technical.length >= 3
    );
  }

  return {
    data,
    nextStep,
    handleAdd,
    handleRemoveSkill,
    handleUpdateSkill,
    allowNext,
  };
}
