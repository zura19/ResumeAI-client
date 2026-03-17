import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";
import type { skillType } from "@/lib/types/buildResumeTypes";
import FormButton from "@/components/shared/FormButton";
import useEditResume from "@/lib/hooks/useEditResume";
import SaveAlert from "../../components/SaveAlert";

interface props {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export default function Skills({ resumeData, id, generatedResumeId }: props) {
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
      if (skillsData.soft.includes(softSkill)) return;
      setSkillsData((prev) => ({
        ...prev,
        soft: [...prev.soft, softSkill],
      }));
      setSoftSkill("");
    }

    if (type === "languages") {
      if (skillsData.languages.includes(language)) return;
      setSkillsData((prev) => ({
        ...prev,
        languages: [...prev.languages, language],
      }));
      setLanguage("");
    }

    if (type === "technical") {
      if (skillsData.technical.includes(technical)) return;
      setSkillsData((prev) => ({
        ...prev,
        technical: [...prev.technical, technical],
      }));
      setTechnical("");
    }
  }

  function handleRemoveSkill(type: skillType, skill: string) {
    setSkillsData((prev) => ({
      ...prev,
      [type]: prev[type].filter((s) => s !== skill),
    }));
  }

  console.log("skillsData:", skillsData);

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
    const dataToSend = {
      ...resumeData,
      skills: skillsData,
    };

    editResume(dataToSend);
  }

  return (
    <div className="pb-0 flex flex-col  gap-10 px-1">
      <SaveAlert />

      <div>
        <div className="relative">
          <Label htmlFor="softSkills" className="font-semibold mb-2">
            Soft Skills
          </Label>
          <Input
            disabled={skillsData.soft.length >= 6}
            value={softSkill}
            onChange={(e) =>
              e.target.value.length <= 20 && setSoftSkill(e.target.value)
            }
            name="softSkills"
            id="softSkills"
            className="h-10"
            placeholder="Comunication, leadership, teamwork, etc..."
          />
          <AddBtn
            hide={softSkill.length === 0}
            onClick={() => handleAdd("soft")}
          />
        </div>
        <SkillsList
          onRemove={(skill: string) => handleRemoveSkill("soft", skill)}
          skills={skillsData.soft}
        />
      </div>

      <div>
        <div className="relative">
          <Label htmlFor="languages" className="font-semibold mb-2">
            Languages
          </Label>
          <Input
            disabled={skillsData.languages.length >= 6}
            value={language}
            onChange={(e) =>
              e.target.value.length <= 20 && setLanguage(e.target.value)
            }
            name="languages"
            id="languages"
            className="h-10"
            placeholder="English, French, etc..."
          />
          <AddBtn
            hide={language.length === 0}
            onClick={() => handleAdd("languages")}
          />
        </div>
        <SkillsList
          onRemove={(skill: string) => handleRemoveSkill("languages", skill)}
          skills={skillsData.languages}
        />
      </div>

      <div>
        <div className="space-y-0 relative">
          <Label htmlFor="technical" className="font-semibold mb-2">
            Technical Skills
          </Label>
          <Input
            disabled={skillsData.technical.length >= 6}
            value={technical}
            onChange={(e) =>
              e.target.value.length <= 20 && setTechnical(e.target.value)
            }
            name="technical"
            id="technical"
            className="h-10"
            placeholder="HTML, CSS, JavaScript, React, etc..."
          />
          <AddBtn
            hide={technical.length === 0}
            onClick={() => handleAdd("technical")}
          />
        </div>
        <SkillsList
          onRemove={(skill: string) => handleRemoveSkill("technical", skill)}
          skills={skillsData.technical}
        />
      </div>
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

interface Btnprops {
  hide: boolean;
  onClick: () => void;
}

function AddBtn({ hide, onClick }: Btnprops) {
  if (hide) return null;
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="flex size-6 items-center justify-center rounded-full bg-muted hover:bg-muted/20  absolute top-[68%] -translate-1/2 right-0 -translate-x-2"
      onClick={onClick}
    >
      <PlusIcon className="size-4 " strokeWidth={2.5} />
    </Button>
  );
}

interface SkillProps {
  skills: string[];
  onRemove: (skill: string) => void;
}

function SkillsList({ skills, onRemove }: SkillProps) {
  return (
    <div className="grid grid-cols-3 items-center justify-center text-xs gap-2 mt-2">
      {skills.map((skill) => (
        <div
          className="text-xs bg-muted rounded-full flex items-center justify-between px-3 py-1.5"
          key={skill}
        >
          {skill}
          <X
            onClick={() => onRemove(skill)}
            className="size-4 cursor-pointer hover:bg-muted-foreground/20 rounded-full transition-all duration-300"
            strokeWidth={2.5}
          />
        </div>
      ))}
    </div>
  );
}
