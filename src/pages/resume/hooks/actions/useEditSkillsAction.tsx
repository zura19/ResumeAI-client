import useEditResume from "@/lib/hooks/useEditResume";
import type { skillType } from "@/lib/types/buildResumeTypes";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface UseEditSkillsActionProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export const MAX_SKILLS = {
  soft: 10,
  technical: 20,
  languages: 10,
} as const;

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

  function areSkillsEqual(current: string[], initial: string[]) {
    if (current.length !== initial.length) {
      return false;
    }

    return current.every((skill, index) => skill === initial[index]);
  }

  function disableAdd(type: skillType): boolean {
    if (type === "soft") return skillsData.soft.length >= MAX_SKILLS.soft;
    if (type === "languages")
      return skillsData.languages.length >= MAX_SKILLS.languages;
    if (type === "technical")
      return skillsData.technical.length >= MAX_SKILLS.technical;
    return true;
  }

  function handleAdd(type: skillType) {
    if (type === "soft") {
      if (
        skillsData.soft.includes(softSkill) ||
        disableAdd("soft") ||
        !softSkill.trim()
      )
        return toast.error("skill already exists or is invalid");

      setSkillsData((previous) => ({
        ...previous,
        soft: [...previous.soft, softSkill],
      }));
      setSoftSkill("");
    }

    if (type === "languages") {
      if (
        skillsData.languages.includes(language) ||
        disableAdd("languages") ||
        !language.trim()
      )
        return toast.error("skill already exists or is invalid");

      setSkillsData((previous) => ({
        ...previous,
        languages: [...previous.languages, language],
      }));
      setLanguage("");
    }

    if (type === "technical") {
      if (
        skillsData.technical.includes(technical) ||
        disableAdd("technical") ||
        !technical.trim()
      )
        return toast.error("skill already exists or is invalid");

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
    const isSoftSame = areSkillsEqual(skillsData.soft, resumeData.skills.soft);
    const isLangSame = areSkillsEqual(
      skillsData.languages,
      resumeData.skills.languages,
    );
    const isTechSame = areSkillsEqual(
      skillsData.technical,
      resumeData.skills.technical,
    );

    return !isSoftSame || !isLangSame || !isTechSame;
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
    disableAdd,
    isPending,
    allowSave,
    handleAdd,
    handleRemoveSkill,
    handleSaveSkills,
  };
}
