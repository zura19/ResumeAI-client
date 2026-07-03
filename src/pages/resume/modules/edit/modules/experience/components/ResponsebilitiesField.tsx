import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import ResponsibilitieItem from "./ResponsibilitieItem";

interface props {
  responsibilities: string[];
  addResponsibility: (value: string) => void;
  removeResponsibility: (index: number) => void;
  updateResponsibility: (index: number, value: string) => void;
  generateResponsibilitie: () => Promise<string>;
  isGenerating: boolean;
  company: string;
  position: string;
}
export default function ResponsebilitiesField({
  responsibilities,
  addResponsibility,
  removeResponsibility,
  updateResponsibility,
  generateResponsibilitie,
  isGenerating,
  company,
  position,
}: props) {
  const [res, setRes] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditingValue(responsibilities[index] ?? "");
  };

  const handleEditSave = () => {
    if (editingIndex === null) return;

    updateResponsibility(editingIndex, editingValue);
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  return (
    <div className="space-y-2 relative">
      <Label htmlFor="responsibilitie" className="font-semibold">
        Responsibilities
      </Label>
      <Input
        className="resize-none"
        value={res}
        onChange={(e) => setRes(e.target.value)}
        name="responsibilitie"
        id="responsibilitie"
        placeholder="Describe your responsibilities here..."
      />
      {res ? (
        <Button
          disabled={responsibilities.length >= 5}
          onClick={() => {
            addResponsibility(res);
            setRes("");
          }}
          size={"icon-sm"}
          className="absolute top-0  right-2 translate-y-[115%] size-6 rounded-full"
        >
          <Plus />
        </Button>
      ) : (
        <Button
          onClick={async () => {
            try {
              const generated = await generateResponsibilitie();
              setRes(generated);
            } catch {
              // Error feedback is handled by the mutation in the form hook.
            }
          }}
          disabled={
            responsibilities.length >= 5 ||
            isGenerating ||
            !company ||
            !position
          }
          variant={"default"}
          className="absolute top-0 text-xs right-2 translate-y-[115%] h-6 rounded-full"
        >
          {isGenerating ? (
            <>
              <span className="hidden sm:inline">Generating...</span>
              <Loader className="size-3.5 animate-spin" />
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Generate With AI</span>
              <Sparkles className="size-3.5  text-indigo-500" />
            </>
          )}
        </Button>
      )}

      {responsibilities.length > 0 && (
        <div className="space-y-3 mt-2 bg-muted/50 rounded-lg p-2">
          {responsibilities.map((r, i) => (
            <div key={i} className="flex text-xs items-center justify-between">
              <ResponsibilitieItem
                responsibility={r}
                isEditing={editingIndex === i}
                editingValue={editingValue}
                onEditingValueChange={setEditingValue}
                onEditStart={() => handleEditStart(i)}
                onEditSave={handleEditSave}
                onEditCancel={handleEditCancel}
                onRemove={() => removeResponsibility(i)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
