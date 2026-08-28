import EditableTagItem from "@/components/shared/EditableTagItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface TechnologiesFieldProps {
  technologies: string[];
  setTechnologies: React.Dispatch<React.SetStateAction<string[]>>;
  label?: string;
  placeholder?: string;
  maxCount?: number;
  id?: string;
}

export default function TechnologiesField({
  technologies = [],
  setTechnologies,
  label = "Technologies",
  placeholder = "React, Node.js, Docker, etc...",
  maxCount = 10,
  id = "technologies",
}: TechnologiesFieldProps) {
  const [tech, setTech] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const handleAddTechnology = () => {
    const nextTechnology = tech.trim();

    if (!nextTechnology) return;

    setTechnologies((prev) => [...(prev || []), nextTechnology]);
    setTech("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditingValue(technologies[index] ?? "");
  };

  const handleEditSave = () => {
    const nextTechnology = editingValue.trim();

    if (editingIndex === null || !nextTechnology) return;

    setTechnologies((prev) =>
      (prev || []).map((item, index) =>
        index === editingIndex ? nextTechnology : item,
      ),
    );
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleRemoveTechnology = (indexToRemove: number) => {
    setTechnologies((prev) =>
      (prev || []).filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <div>
      <div className="relative">
        <Label htmlFor={id} className="font-semibold mb-2">
          {label}
        </Label>
        <Input
          disabled={(technologies || []).length >= maxCount}
          value={tech}
          onChange={(e) =>
            e.target.value.length <= 20 && setTech(e.target.value)
          }
          onKeyDown={handleKeyDown}
          name={id}
          id={id}
          className="h-10"
          placeholder={placeholder}
        />

        {tech && (
          <Button
            size={"icon"}
            variant={"default"}
            className="flex size-6 items-center justify-center rounded-full absolute top-[68%] -translate-1/2 right-0 -translate-x-2"
            onClick={handleAddTechnology}
            type="button"
          >
            <PlusIcon className="size-4" strokeWidth={2} />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 items-center justify-center text-xs gap-2 mt-2">
        {(technologies || []).map((item, index) => (
          <EditableTagItem
            key={`${item}-${index}`}
            value={item}
            isEditing={editingIndex === index}
            editingValue={editingValue}
            onEditingValueChange={(value) =>
              value.length <= 20 && setEditingValue(value)
            }
            onEditStart={() => handleEditStart(index)}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            onRemove={() => handleRemoveTechnology(index)}
            maxLength={20}
          />
        ))}
      </div>
    </div>
  );
}
