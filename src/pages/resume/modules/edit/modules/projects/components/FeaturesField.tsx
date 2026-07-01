import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Plus, Sparkles, X } from "lucide-react";
import useGenerateFeature from "@/pages/resume/hooks/actions/projects/useGenerateFeature";

interface props {
  title: string;
  technologies: string[];
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function FeaturesField({
  features,
  setFeatures,
  title,
  technologies,
}: props) {
  const {
    feature,
    setFeature,
    generateFeature,
    isGenerating,
    addFeature,
    removeFeature,
  } = useGenerateFeature({
    title,
    technologies,
    features,
    setFeatures,
  });

  return (
    <div className="space-y-2 relative">
      <Label htmlFor="features" className="font-semibold">
        Features
      </Label>
      <Input
        className="resize-none"
        value={feature}
        onChange={(e) => setFeature(e.target.value)}
        name="features"
        id="features"
        placeholder="Describe your feature here..."
      />
      {feature ? (
        <Button
          disabled={features.length >= 5}
          onClick={addFeature}
          size={"icon-sm"}
          className="absolute top-0  right-2 translate-y-[115%] size-6 rounded-full"
        >
          <Plus />
        </Button>
      ) : (
        <Button
          onClick={() => generateFeature()}
          disabled={features.length >= 5 || isGenerating || !title}
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

      {features.length > 0 && (
        <div className="space-y-3 mt-2 bg-muted/50 rounded-lg p-2">
          {features.map((r, i) => (
            <div key={i} className="flex text-xs items-center justify-between">
              <span>{r}</span>
              <Button
                size={"icon-sm"}
                variant={"destructive"}
                className="size-5 rounded-full"
                onClick={() => removeFeature(i)}
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
