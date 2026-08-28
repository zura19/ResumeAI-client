import { reorderProjectService } from "@/lib/services/resume/edit/reorderProjectService";
import type { AiGeneratedResume, Project } from "@/lib/types/AiGeneratedResume";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ResumeQueryData {
  resumes: AiGeneratedResume[];
  type: string;
  title: string | null;
}

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
    onMutate: async ({ projectId, order }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["resume", id] });

      // Snapshot the previous value in case we need to roll back
      const previousData = queryClient.getQueryData<ResumeQueryData>([
        "resume",
        id,
      ]);

      // Optimistically update the cache to the new state
      queryClient.setQueryData(
        ["resume", id],
        (oldData: ResumeQueryData | undefined) => {
          if (!oldData || !oldData.resumes) return oldData;

          const updatedResumes = oldData.resumes.map(
            (resume: AiGeneratedResume) => {
              if (resume.id !== generatedResumeId) return resume;

              // We must clone the objects so they get new references, otherwise react-pdf 
              // might not detect the change and will fail to update the view on reorder.
              const projects = (resume.projects || []).map(p => ({ ...p }));
              const projectIndex = projects.findIndex(
                (p: Project) => p.id === projectId,
              );

              if (projectIndex !== -1) {
                const [movedProject] = projects.splice(projectIndex, 1);
                projects.splice(order, 0, movedProject);
              }

              return { ...resume, projects };
            },
          );

          return { ...oldData, resumes: updatedResumes };
        },
      );

      // Return a context with the previous data to use in onError
      return { previousData };
    },
    onSuccess: () => {
      toast.success("Project reordered successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error, _, context) => {
      // If the mutation fails, use the context to roll back the cache
      if (context?.previousData) {
        queryClient.setQueryData(["resume", id], context.previousData);
      }
      toast.error(error.message || "Failed to reorder project");
    },
  });

  return {
    reorderProject,
    isReordering,
  };
}
