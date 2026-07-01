import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormButton from "@/components/shared/FormButton";
import SaveAlert from "../../components/SaveAlert";
import AddBtn from "./components/AddBtn";
import SkillsList from "./components/SkillsList";
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
    isPending,
    allowSave,
    handleAdd,
    handleRemoveSkill,
    handleSaveSkills,
  } = useEditSkillsAction({
    resumeData,
    id,
    generatedResumeId,
  });

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
