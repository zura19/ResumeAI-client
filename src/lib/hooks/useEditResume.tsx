import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AiGeneratedResume } from "../types/AiGeneratedResume";
import {
  updateResumeService,
  updateSummaryService,
} from "../services/resume/updateResumeService";
import { toast } from "sonner";

export default function useEditResume(id: string, generatedResumeId: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: editResume, isPending } = useMutation({
    mutationFn: async (data: AiGeneratedResume) => {
      // const sent = {...data,}

      const re = await updateResumeService(id, generatedResumeId, data);
      return re.data;
    },
    onSuccess: () => {
      toast.success("Resume updated successfully");
      queryClient.invalidateQueries({
        queryKey: [`resume-${id}`, id],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: updateSummary, isPending: isUpdatingSummary } =
    useMutation({
      mutationFn: async (data: AiGeneratedResume) => {
        // const sent = {...data,}
        const re = await updateSummaryService(id, data);
        return re.data;
      },
      onSuccess: () => {
        toast.success("Summary updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { editResume, isPending, updateSummary, isUpdatingSummary };
}
