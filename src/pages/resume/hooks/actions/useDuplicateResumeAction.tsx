import { duplicateResumeService } from "@/lib/services/resume/duplicateResumeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UseDuplicateResumeActionProps {
  resumeId: string;
  generatedId: string;
}

export default function useDuplicateResumeAction({
  resumeId,
  generatedId,
}: UseDuplicateResumeActionProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: duplicateResume, isPending } = useMutation({
    mutationFn: async () => duplicateResumeService(resumeId, generatedId),
    onSuccess: (response) => {
      toast.success("Resume duplicated successfully");
      queryClient.invalidateQueries({
        queryKey: ["resume", response.data.resumeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate(`/resume/${response.data.resumeId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    duplicateResume,
    isPending,
  };
}
