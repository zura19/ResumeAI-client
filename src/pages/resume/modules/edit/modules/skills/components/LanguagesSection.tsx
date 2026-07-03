import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddBtn from "./AddBtn";
import SkillsList from "./SkillsList";

interface LanguagesSectionProps {
  value: string;
  skills: string[];
  disabled: boolean;
  setValue: (value: string) => void;
  onAdd: () => void;
  onRemove: (type: "languages", index: number) => void;
  onUpdate: (type: "languages", index: number, value: string) => void;
}

export default function LanguagesSection({
  value,
  skills,
  disabled,
  setValue,
  onAdd,
  onRemove,
  onUpdate,
}: LanguagesSectionProps) {
  return (
    <div>
      <div className="relative">
        <Label htmlFor="languages" className="font-semibold mb-2">
          Languages
        </Label>
        <Input
          disabled={disabled}
          value={value}
          onChange={(e) => e.target.value.length <= 20 && setValue(e.target.value)}
          name="languages"
          id="languages"
          className="h-10"
          placeholder="English, French, etc..."
        />
        <AddBtn hide={value.length === 0} disabled={disabled} onClick={onAdd} />
      </div>
      <SkillsList
        skills={skills}
        type="languages"
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    </div>
  );
}
