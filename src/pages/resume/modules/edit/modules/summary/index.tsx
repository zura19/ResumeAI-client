import FormButton from "@/components/shared/FormButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";
import SaveAlert from "../../components/SaveAlert";
import useEditSummaryAction from "@/pages/resume/hooks/actions/useEditSummaryAction";

interface props {
  resumeData: AiGeneratedResume;
  generatedResumeId: string;
  id: string;
}

export default function Summary({ resumeData, id, generatedResumeId }: props) {
  const {
    summary,
    setSummary,
    isChanged,
    isPending,
    isUpdatingSummary,
    handleSave,
    handleGenerateWithAI,
  } = useEditSummaryAction({
    resumeData,
    id,
    generatedResumeId,
  });

  return (
    <form onSubmit={handleSave} className=" space-y-4">
      <SaveAlert />

      <Textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="resize-none"
      />
      <div className="flex items-center justify-between mt-4">
        <FormButton
          disabled={!isChanged || !summary || isPending || isUpdatingSummary}
          loading={isPending}
          loadingText="Saving Changes..."
        >
          Save Summary
        </FormButton>

        <Button
          type="button"
          variant="outline"
          disabled={isUpdatingSummary || isPending}
          onClick={() => handleGenerateWithAI()}
          // disabled={!isChanged || isPending}
        >
          Generate with AI
          <motion.div
            className="text-indigo-400"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -5, 10, -5, 0] }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              rotate: { repeat: Infinity, repeatDelay: 4 },
            }}
          >
            <SparklesIcon className="size-4.5 ml-1" />
          </motion.div>
        </Button>
      </div>
    </form>
  );
}
