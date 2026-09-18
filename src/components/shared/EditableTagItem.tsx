import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, GripVertical, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
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
  draggable = false,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  isDragging = false,
  isDragOver = false,
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
    <div
      draggable={!isEditing && Boolean(draggable)}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={cn(
        displayClassName,
        draggable &&
          !isEditing &&
          "cursor-grab active:cursor-grabbing select-none transition-all",
        isDragging && "opacity-40 scale-95 border-dashed border-indigo-500",
        isDragOver &&
          "ring-2 ring-primary ring-offset-1 bg-primary/10 border-indigo-500",
      )}
    >
      <div className="flex items-center gap-1.5 min-w-0 pr-2">
        {draggable && !isEditing && (
          <GripVertical className="size-3 shrink-0 text-muted-foreground/60 hover:text-foreground" />
        )}
        <span className="truncate">{value}</span>
      </div>
      <div className="flex items-center gap-1 shrink-0">
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
