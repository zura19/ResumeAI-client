import { X } from "lucide-react";

interface SkillsListProps {
  skills: string[];
  onRemove: (skill: string) => void;
}

export default function SkillsList({ skills, onRemove }: SkillsListProps) {
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
