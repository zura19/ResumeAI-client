import { reorderExperienceService } from "@/lib/services/resume/edit/reorderExperienceService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseReorderExperienceProps {
  id: string;
  generatedResumeId: string;
}

export default function useReorderExperience({
  id,
  generatedResumeId,
}: UseReorderExperienceProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: reorderExperience, isPending: isReordering } = useMutation({
    mutationFn: async ({
      experienceId,
      order,
    }: {
      experienceId: string;
      order: number;
    }) => {
      const res = await reorderExperienceService(
        generatedResumeId,
        experienceId,
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
    reorderExperience,
    isReordering,
  };
}
