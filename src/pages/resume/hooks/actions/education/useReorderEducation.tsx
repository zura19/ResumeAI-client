import { reorderEducationService } from "@/lib/services/resume/edit/reorderEducationService";
import type {
  AiGeneratedResume,
  Education,
} from "@/lib/types/AiGeneratedResume";
import type { Resume } from "@/lib/types/resume";
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

  const { mutateAsync: reorderEducation, isPending: isReordering } =
    useMutation({
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
      onMutate: async ({ educationId, order }) => {
        await queryClient.cancelQueries({ queryKey: ["resume", id] });

        const previousData = queryClient.getQueryData(["resume", id]);

        queryClient.setQueryData(
          ["resume", id],
          (oldData: Resume | undefined) => {
            if (!oldData || !oldData.resumes) return oldData;

            const updatedResumes = oldData.resumes.map(
              (resume: AiGeneratedResume) => {
                if (resume.id !== generatedResumeId) return resume;

                const education = [...(resume.education || [])];
                const educationIndex = education.findIndex(
                  (e: Education) => e.id === educationId,
                );

                if (educationIndex !== -1) {
                  const [movedEducation] = education.splice(educationIndex, 1);
                  education.splice(order, 0, movedEducation);
                }

                return { ...resume, education };
              },
            );

            return { ...oldData, resumes: updatedResumes };
          },
        );

        return { previousData };
      },
      onSuccess: () => {
        toast.success("Education reordered successfully");
      },
      onError: (error, _, context) => {
        if (context?.previousData) {
          queryClient.setQueryData(["resume", id], context.previousData);
        }
        toast.error(error.message || "Failed to reorder education");
      },
    });

  return {
    reorderEducation,
    isReordering,
  };
}
