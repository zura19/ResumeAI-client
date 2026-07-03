import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, X } from "lucide-react";

interface EditableTagItemProps {
  value: string;
  isEditing: boolean;
  editingValue: string;
  onEditingValueChange: (value: string) => void;
  onEditStart: () => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onRemove: () => void;
  maxLength?: number;
  editingClassName?: string;
  displayClassName?: string;
}

export default function EditableTagItem({
  value,
  isEditing,
  editingValue,
  onEditingValueChange,
  onEditStart,
  onEditSave,
  onEditCancel,
  onRemove,
  maxLength,
  editingClassName = "col-span-3 flex w-full items-center gap-2 sm:col-span-1",
  displayClassName = "text-xs bg-muted rounded-full flex items-center justify-between px-3 py-1.5",
}: EditableTagItemProps) {
  if (isEditing) {
    return (
      <div className={editingClassName}>
        <Input
          value={editingValue}
          onChange={(e) => onEditingValueChange(e.target.value)}
          className="h-8 text-xs"
          maxLength={maxLength}
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
    <div className={displayClassName}>
      <span className="truncate pr-2">{value}</span>
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
    </div>
  );
}
