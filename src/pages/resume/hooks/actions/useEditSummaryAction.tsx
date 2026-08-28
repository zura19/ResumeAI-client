import { updateSummaryService } from "@/lib/services/resume/edit/updateSummaryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface UseEditSummaryActionProps {
  resumeData: { summary: string };
  generatedResumeId: string;
  id: string;
}

export default function useEditSummaryAction({
  resumeData,
  generatedResumeId,
  id,
}: UseEditSummaryActionProps) {
  const [summary, setSummary] = useState(resumeData.summary || "");
  const isChanged = summary !== resumeData.summary;
  const queryClient = useQueryClient();

  const { mutateAsync: editSummary, isPending } = useMutation({
    mutationFn: async (nextSummary: string) => {
      const res = await updateSummaryService(generatedResumeId, nextSummary);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Summary updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["resume", id],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // TODO: replace with a dedicated AI summary generation service when available
  const isUpdatingSummary = false;

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await editSummary(summary);
  }

  async function handleGenerateWithAI() {
    // TODO: wire up AI summary generation with the new API
  }

  return {
    summary,
    setSummary,
    isChanged,
    isPending,
    isUpdatingSummary,
    handleSave,
    handleGenerateWithAI,
  };
}
