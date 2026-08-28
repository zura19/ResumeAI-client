/* eslint-disable @typescript-eslint/no-explicit-any */
import { reorderExperienceService } from "@/lib/services/resume/edit/reorderExperienceService";
import type {
  AiGeneratedResume,
  Experience,
} from "@/lib/types/AiGeneratedResume";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ResumeQueryData {
  resumes: AiGeneratedResume[];
  type: string;
  title: string | null;
}

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

        const previousData = queryClient.getQueryData<ResumeQueryData>([
          "resume",
          id,
        ]);

        queryClient.setQueryData(
          ["resume", id],
          (oldData: ResumeQueryData | undefined) => {
            if (!oldData || !oldData.resumes) return oldData;

            const updatedResumes = oldData.resumes.map(
              (resume: AiGeneratedResume) => {
                if (resume.id !== generatedResumeId) return resume;

                // We must clone the objects so they get new references, otherwise react-pdf 
                // might not detect the change and will fail to update the view on reorder.
                const experienceData = (resume as any).experiences || resume.experience || [];
                const experience = experienceData.map((e: Experience) => ({ ...e }));
                const experienceIndex = experience.findIndex(
                  (e: Experience) => e.id === experienceId,
                );

                if (experienceIndex !== -1) {
                  const [movedExperience] = experience.splice(experienceIndex, 1);
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
        queryClient.invalidateQueries({ queryKey: ["resume", id] });
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
