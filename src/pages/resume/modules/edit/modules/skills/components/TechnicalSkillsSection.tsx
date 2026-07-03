import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { skillType } from "@/lib/types/buildResumeTypes";
import AddBtn from "./AddBtn";
import SkillsList from "./SkillsList";

interface TechnicalSkillsSectionProps {
  value: string;
  skills: string[];
  disabled: boolean;
  setValue: (value: string) => void;
  onAdd: () => void;
  onRemove: (type: skillType, index: number) => void;
  onUpdate: (type: skillType, index: number, value: string) => void;
}

export default function TechnicalSkillsSection({
  value,
  skills,
  disabled,
  setValue,
  onAdd,
  onRemove,
  onUpdate,
}: TechnicalSkillsSectionProps) {
  return (
    <div>
      <div className="space-y-0 relative">
        <Label htmlFor="technical" className="font-semibold mb-2">
          Technical Skills
        </Label>
        <Input
          disabled={disabled}
          value={value}
          onChange={(e) => e.target.value.length <= 20 && setValue(e.target.value)}
          name="technical"
          id="technical"
          className="h-10"
          placeholder="HTML, CSS, JavaScript, React, etc..."
        />
        <AddBtn hide={value.length === 0} disabled={disabled} onClick={onAdd} />
      </div>
      <SkillsList
        skills={skills}
        type="technical"
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    </div>
  );
}
