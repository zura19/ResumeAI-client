import { generateFeatureService } from "@/lib/services/ai/generateFeatureService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface UseGenerateFeatureProps {
  title: string;
  technologies: string[];
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function useGenerateFeature({
  title,
  technologies,
  features,
  setFeatures,
}: UseGenerateFeatureProps) {
  const [feature, setFeature] = useState("");

  const { mutateAsync: generateFeature, isPending: isGenerating } = useMutation({
    mutationFn: async () =>
      await generateFeatureService({ title, technologies, features }),
    onSuccess: (data) => {
      setFeature(data.data.feature);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to generate");
    },
  });

  function addFeature() {
    setFeatures((previous) => [...previous, feature]);
    setFeature("");
  }

  function removeFeature(index: number) {
    setFeatures(features.filter((_, featureIndex) => featureIndex !== index));
  }

  return {
    feature,
    setFeature,
    generateFeature,
    isGenerating,
    addFeature,
    removeFeature,
  };
}
