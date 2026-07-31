/* eslint-disable @typescript-eslint/no-explicit-any */
import { reorderExperienceService } from "@/lib/services/resume/edit/reorderExperienceService";
import type {
  AiGeneratedResume,
  Experience,
} from "@/lib/types/AiGeneratedResume";
import type { Resume } from "@/lib/types/resume";
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

  const { mutateAsync: reorderExperience, isPending: isReordering } =
    useMutation({
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
      onMutate: async ({ experienceId, order }) => {
        await queryClient.cancelQueries({ queryKey: ["resume", id] });

        const previousData = queryClient.getQueryData(["resume", id]);

        queryClient.setQueryData(
          ["resume", id],
          (oldData: Resume | undefined) => {
            if (!oldData || !oldData) return oldData;

            const updatedResumes = oldData.resumes.map(
              (resume: AiGeneratedResume) => {
                if (resume.id !== generatedResumeId) return resume;

                // The backend actually returns 'experiences' instead of 'experience'
                // so we need to fallback to (resume as any).experiences
                const experienceData =
                  (resume as any).experiences || resume.experience || [];
                const experience = [...experienceData];
                const experienceIndex = experience.findIndex(
                  (e: Experience) => e.id === experienceId,
                );

                if (experienceIndex !== -1) {
                  const [movedExperience] = experience.splice(
                    experienceIndex,
                    1,
                  );
                  experience.splice(order, 0, movedExperience);
                }

                return { ...resume, experience, experiences: experience };
              },
            );

            return { ...oldData, resumes: updatedResumes };
          },
        );

        return { previousData };
      },
      onSuccess: () => {
        toast.success("Experience reordered successfully");
      },
      onError: (error, _, context) => {
        if (context?.previousData) {
          queryClient.setQueryData(["resume", id], context.previousData);
        }
        toast.error(error.message || "Failed to reorder experience");
      },
    });

  return {
    reorderExperience,
    isReordering,
  };
}
