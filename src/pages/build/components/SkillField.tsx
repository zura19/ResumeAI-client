import EditableTagItem from "@/components/shared/EditableTagItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { skillType } from "@/lib/types/buildResumeTypes";
import { skillsData } from "@/constants/resume/skillsData";
import SkillSuggestions from "./SkillSuggestions";

interface props {
  type: skillType;
  data: string[];
  label: string;
  placeholder: string;
  description: string;
  handleAdd: (type: skillType, skill: string) => void;
  handleRemove: (type: skillType, skill: string) => void;
  handleUpdate: (type: skillType, currentSkill: string, nextSkill: string) => void;
}

export default function SkillField({
  type,
  data,
  handleAdd,
  handleRemove,
  handleUpdate,
  label,
  placeholder,
  description,
}: props) {
  const [temp, setTemp] = useState("");
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const suggestions = useMemo(
    () =>
      skillsData[type].filter(
        (skill) =>
          skill.toLocaleLowerCase().includes(temp.toLocaleLowerCase()) &&
          !data.includes(skill),
      ),
    [data, temp, type],
  );

  const add = () => {
    const nextSkill = temp.trim();

    if (!nextSkill) return;

    handleAdd(type, nextSkill);
    setTemp("");
  };

  const handleEditStart = (skill: string) => {
    setEditingSkill(skill);
    setEditingValue(skill);
  };

  const handleEditSave = () => {
    if (!editingSkill) return;

    handleUpdate(type, editingSkill, editingValue);
    setEditingSkill(null);
    setEditingValue("");
  };

  const handleEditCancel = () => {
    setEditingSkill(null);
    setEditingValue("");
  };

  return (
    <div key={type}>
      <div className="relative">
        <Label htmlFor={type} className="font-semibold mb-2">
          {label}
        </Label>

        <Input
          disabled={data.length >= 6}
          value={temp}
          onChange={(e) =>
            e.target.value.length <= 20 && setTemp(e.target.value)
          }
          name={type}
          id={type}
          className={cn(
            "h-10 focus-visible:ring-0",
            temp.length > 0 ? "rounded-b-none" : "",
          )}
          placeholder={placeholder}
        />

        {temp.length > 0 && (
          <Button
            disabled={temp.trim().length <= 2}
            size={"icon"}
            className="flex size-6 items-center justify-center rounded-full absolute top-[68%] -translate-1/2 right-0 -translate-x-2"
            onClick={add}
          >
            <PlusIcon className="size-4" strokeWidth={2.5} />
          </Button>
        )}

        <SkillSuggestions
          type={type}
          temp={temp}
          suggestions={suggestions}
          onSelect={(skill) => {
            handleAdd(type, skill);
            setTemp("");
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{description}</p>

      <div className="grid grid-cols-3 items-center justify-center text-xs gap-2 mt-2">
        {data.map((skill) => (
          <EditableTagItem
            key={skill}
            value={skill}
            isEditing={editingSkill === skill}
            editingValue={editingValue}
            onEditingValueChange={(value) =>
              value.length <= 20 && setEditingValue(value)
            }
            onEditStart={() => handleEditStart(skill)}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            onRemove={() => handleRemove(type, skill)}
            maxLength={20}
          />
        ))}
      </div>
    </div>
  );
}
