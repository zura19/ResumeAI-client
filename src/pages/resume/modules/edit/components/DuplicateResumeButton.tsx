import { Button } from "@/components/ui/button";
import useDuplicateResumeAction from "@/pages/resume/hooks/actions/useDuplicateResumeAction";
import { Copy, Loader } from "lucide-react";

interface DuplicateResumeButtonProps {
  resumeId: string;
  generatedId: string;
  disabled?: boolean;
}

export default function DuplicateResumeButton({
  resumeId,
  generatedId,
  disabled,
}: DuplicateResumeButtonProps) {
  const { duplicateResume, isPending } = useDuplicateResumeAction({
    resumeId,
    generatedId,
  });

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className="rounded-full"
      disabled={disabled || isPending || !resumeId || !generatedId}
      onClick={() => duplicateResume()}
      aria-label="Duplicate resume"
      title="Duplicate resume"
    >
      {isPending ? <Loader className="animate-spin" /> : <Copy />}
    </Button>
  );
}
