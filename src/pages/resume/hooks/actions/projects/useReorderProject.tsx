import { reorderProjectService } from "@/lib/services/resume/edit/reorderProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseReorderProjectProps {
  id: string;
  generatedResumeId: string;
}

export default function useReorderProject({
  id,
  generatedResumeId,
}: UseReorderProjectProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: reorderProject, isPending: isReordering } = useMutation({
    mutationFn: async ({
      projectId,
      order,
    }: {
      projectId: string;
      order: number;
    }) => {
      const res = await reorderProjectService(
        generatedResumeId,
        projectId,
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
    reorderProject,
    isReordering,
  };
}
