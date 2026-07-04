import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Pencil, Plus, X } from "lucide-react";
import { useState } from "react";

interface ArrayInputProps {
  id: string;
  label: string;
  placeholder: string;
  arr: string[];
  add: (value: string) => void;
  update: (index: number, value: string) => void;
  remove: (index: number) => void;
}

export default function ArrayInput({
  id,
  label,
  placeholder,
  add,
  update,
  remove,
  arr,
}: ArrayInputProps) {
  const [temp, setTemp] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  function handleAdd() {
    const value = temp.trim();
    if (!value) return;
    add(value);
    setTemp("");
  }

  function handleEditStart(index: number, value: string) {
    setEditingIndex(index);
    setEditingValue(value);
  }

  function handleEditSave() {
    if (editingIndex === null) return;
    const value = editingValue.trim();
    if (!value) return;

    update(editingIndex, value);
    setEditingIndex(null);
    setEditingValue("");
  }

  function handleEditCancel() {
    setEditingIndex(null);
    setEditingValue("");
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative rounded-lg">
        <Input
          type="text"
          placeholder={placeholder}
          id={id}
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />
        <Button
          onClick={handleAdd}
          size={"icon-sm"}
          type="button"
          className={cn(
            "absolute top-1/2 right-0 -translate-x-3 -translate-y-1/2 rounded-full size-6",
            temp.trim()
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <Plus />
        </Button>
      </div>
      {arr.length > 0 && (
        <div className="bg-muted p-4 space-y-2 text-primary rounded-lg">
          {arr.map((feature, index) => (
            <div
              key={`${feature}-${index}`}
              className="flex items-center gap-2 justify-between"
            >
              <div className="flex items-center gap-2 flex-1">
                <Check className="size-5 text-emerald-600" />
                {editingIndex === index ? (
                  <Input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    className="bg-background"
                  />
                ) : (
                  <span>{feature}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingIndex === index ? (
                  <>
                    <Button
                      type="button"
                      size="icon-sm"
                      onClick={handleEditSave}
                      className="rounded-full size-5"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={handleEditCancel}
                      className="rounded-full"
                    >
                      <X className="size-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => handleEditStart(index, feature)}
                      className="rounded-full"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <X
                      onClick={() => remove(index)}
                      className="cursor-pointer size-5 text-muted-foreground"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
