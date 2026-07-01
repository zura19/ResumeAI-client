import useEditResume from "@/lib/hooks/useEditResume";
import type { skillType } from "@/lib/types/buildResumeTypes";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useMemo, useState } from "react";

interface UseEditSkillsActionProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export default function useEditSkillsAction({
  resumeData,
  id,
  generatedResumeId,
}: UseEditSkillsActionProps) {
  const [skillsData, setSkillsData] = useState(
    resumeData.skills || {
      soft: [],
      languages: [],
      technical: [],
    },
  );
  const [softSkill, setSoftSkill] = useState("");
  const [language, setLanguage] = useState("");
  const [technical, setTechnical] = useState("");

  const { editResume, isPending } = useEditResume(id, generatedResumeId);

  function handleAdd(type: skillType) {
    if (type === "soft") {
      if (skillsData.soft.includes(softSkill)) {
        return;
      }

      setSkillsData((previous) => ({
        ...previous,
        soft: [...previous.soft, softSkill],
      }));
      setSoftSkill("");
    }

    if (type === "languages") {
      if (skillsData.languages.includes(language)) {
        return;
      }

      setSkillsData((previous) => ({
        ...previous,
        languages: [...previous.languages, language],
      }));
      setLanguage("");
    }

    if (type === "technical") {
      if (skillsData.technical.includes(technical)) {
        return;
      }

      setSkillsData((previous) => ({
        ...previous,
        technical: [...previous.technical, technical],
      }));
      setTechnical("");
    }
  }

  function handleRemoveSkill(type: skillType, skill: string) {
    setSkillsData((previous) => ({
      ...previous,
      [type]: previous[type].filter((item) => item !== skill),
    }));
  }

  const allowSave = useMemo(() => {
    const isSoftSame = skillsData.soft.length === resumeData.skills.soft.length;
    const isLangSame =
      skillsData.languages.length === resumeData.skills.languages.length;
    const isTechSame =
      skillsData.technical.length === resumeData.skills.technical.length;

    return (
      (!isSoftSame && !isLangSame && !isTechSame) ||
      (skillsData.soft.length >= 3 &&
        skillsData.languages.length >= 1 &&
        skillsData.technical.length >= 3)
    );
  }, [resumeData.skills, skillsData]);

  function handleSaveSkills() {
    editResume({
      ...resumeData,
      skills: skillsData,
    });
  }

  return {
    skillsData,
    softSkill,
    setSoftSkill,
    language,
    setLanguage,
    technical,
    setTechnical,
    isPending,
    allowSave,
    handleAdd,
    handleRemoveSkill,
    handleSaveSkills,
  };
}
