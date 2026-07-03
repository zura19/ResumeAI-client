import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { skillType } from "@/lib/types/buildResumeTypes";
import AddBtn from "./AddBtn";
import SkillsList from "./SkillsList";

interface SoftSkillsSectionProps {
  value: string;
  skills: string[];
  disabled: boolean;
  setValue: (value: string) => void;
  onAdd: () => void;
  onRemove: (type: skillType, index: number) => void;
  onUpdate: (type: skillType, index: number, value: string) => void;
}

export default function SoftSkillsSection({
  value,
  skills,
  disabled,
  setValue,
  onAdd,
  onRemove,
  onUpdate,
}: SoftSkillsSectionProps) {
  return (
    <div>
      <div className="relative">
        <Label htmlFor="softSkills" className="font-semibold mb-2">
          Soft Skills
        </Label>
        <Input
          disabled={disabled}
          value={value}
          onChange={(e) => e.target.value.length <= 20 && setValue(e.target.value)}
          name="softSkills"
          id="softSkills"
          className="h-10"
          placeholder="Comunication, leadership, teamwork, etc..."
        />
        <AddBtn hide={value.length === 0} disabled={disabled} onClick={onAdd} />
      </div>
      <SkillsList
        skills={skills}
        type="soft"
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    </div>
  );
}
