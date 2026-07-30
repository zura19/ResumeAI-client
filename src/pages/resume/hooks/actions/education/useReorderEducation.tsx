import { reorderEducationService } from "@/lib/services/resume/edit/reorderEducationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseReorderEducationProps {
  id: string;
  generatedResumeId: string;
}

export default function useReorderEducation({
  id,
  generatedResumeId,
}: UseReorderEducationProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: reorderEducation, isPending: isReordering } = useMutation({
    mutationFn: async ({
      educationId,
      order,
    }: {
      educationId: string;
      order: number;
    }) => {
      const res = await reorderEducationService(
        generatedResumeId,
        educationId,
        order,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    reorderEducation,
    isReordering,
  };
}
