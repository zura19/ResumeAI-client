import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, X } from "lucide-react";

interface ResponsibilitieItemProps {
  responsibility: string;
  isEditing: boolean;
  editingValue: string;
  onEditingValueChange: (value: string) => void;
  onEditStart: () => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onRemove: () => void;
}

export default function ResponsibilitieItem({
  responsibility,
  isEditing,
  editingValue,
  onEditingValueChange,
  onEditStart,
  onEditSave,
  onEditCancel,
  onRemove,
}: ResponsibilitieItemProps) {
  if (isEditing) {
    return (
      <div className="flex w-full items-center gap-2">
        <Input
          value={editingValue}
          onChange={(e) => onEditingValueChange(e.target.value)}
          className="h-8 text-xs"
        />
        <div className="flex items-center gap-1">
          <Button
            size={"icon-sm"}
            className="size-5 rounded-full"
            onClick={onEditSave}
            disabled={!editingValue.trim()}
          >
            <Check className="size-3.5" />
          </Button>
          <Button
            size={"icon-sm"}
            variant={"outline"}
            className="size-5 rounded-full"
            onClick={onEditCancel}
          >
            <X className="size-3.5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <span className="pr-2">{responsibility}</span>
      <div className="flex items-center gap-1">
        <Button
          size={"icon-sm"}
          variant={"outline"}
          className="size-5 rounded-full"
          onClick={onEditStart}
        >
          <Pencil className="size-3" />
        </Button>
        <Button
          size={"icon-sm"}
          variant={"destructive"}
          className="size-5 rounded-full"
          onClick={onRemove}
        >
          <X className="size-3" />
        </Button>
      </div>
    </>
  );
}
