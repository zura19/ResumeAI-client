import EditableTagItem from "@/components/shared/EditableTagItem";
import { useState } from "react";
import type { skillType } from "@/lib/types/buildResumeTypes";

interface SkillsListProps {
  skills: string[];
  type: skillType;
  onRemove: (type: skillType, index: number) => void;
  onUpdate: (type: skillType, index: number, value: string) => void;
  onReorder?: (type: skillType, fromIndex: number, toIndex: number) => void;
}

export default function SkillsList({
  skills,
  type,
  onRemove,
  onUpdate,
  onReorder,
}: SkillsListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = (index: number) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    onReorder?.(type, draggedIndex, index);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
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
          draggable={Boolean(onReorder) && editingIndex === null}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={() => handleDragLeave(index)}
          onDrop={() => handleDrop(index)}
          onDragEnd={handleDragEnd}
          isDragging={draggedIndex === index}
          isDragOver={dragOverIndex === index}
        />
      ))}
    </div>
  );
}
