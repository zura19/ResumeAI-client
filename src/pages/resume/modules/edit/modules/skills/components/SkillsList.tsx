import EditableTagItem from "@/components/shared/EditableTagItem";
import { useState } from "react";
import type { skillType } from "@/lib/types/buildResumeTypes";

interface SkillsListProps {
  skills: string[];
  type: skillType;
  onRemove: (type: skillType, index: number) => void;
  onUpdate: (type: skillType, index: number, value: string) => void;
}

export default function SkillsList({
  skills,
  type,
  onRemove,
  onUpdate,
}: SkillsListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditingValue(skills[index] ?? "");
  };

  const handleEditSave = () => {
    if (editingIndex === null) return;

    onUpdate(type, editingIndex, editingValue);
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  return (
    <div className="grid grid-cols-3 items-center justify-center text-xs gap-2 mt-2">
      {skills.map((skill, index) => (
        <EditableTagItem
          key={`${skill}-${index}`}
          value={skill}
          isEditing={editingIndex === index}
          editingValue={editingValue}
          onEditingValueChange={(value) =>
            value.length <= 20 && setEditingValue(value)
          }
          onEditStart={() => handleEditStart(index)}
          onEditSave={handleEditSave}
          onEditCancel={handleEditCancel}
          onRemove={() => onRemove(type, index)}
          maxLength={20}
        />
      ))}
    </div>
  );
}
