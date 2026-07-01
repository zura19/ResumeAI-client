import useEditResume from "@/lib/hooks/useEditResume";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useState } from "react";

interface UseEditSummaryActionProps {
  resumeData: AiGeneratedResume;
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

  const { editResume, isPending, isUpdatingSummary, updateSummary } =
    useEditResume(id, generatedResumeId);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!summary) {
      return;
    }

    await editResume({
      ...resumeData,
      summary,
    });
  }

  async function handleGenerateWithAI() {
    const response = await updateSummary({ ...resumeData });
    setSummary(response.summary);
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
