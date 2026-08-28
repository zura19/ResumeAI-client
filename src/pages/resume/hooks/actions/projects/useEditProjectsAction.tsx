import { createProjectService } from "@/lib/services/resume/edit/createProjectService";
import { updateProjectService } from "@/lib/services/resume/edit/updateProjectService";
import { deleteProjectService } from "@/lib/services/resume/edit/deleteProjectService";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseEditProjectsActionProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

type ProjectItem = Omit<AiGeneratedResume["projects"][0], "id">;

export default function useEditProjectsAction({
  id,
  generatedResumeId,
}: UseEditProjectsActionProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: addProject, isPending: isAdding } = useMutation({
    mutationFn: async (project: ProjectItem) => {
      const res = await createProjectService(generatedResumeId, project);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Project added successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: editProject, isPending: isEditing } = useMutation({
    mutationFn: async ({
      projectId,
      project,
    }: {
      projectId: string;
      project: ProjectItem;
    }) => {
      const res = await updateProjectService(
        generatedResumeId,
        projectId,
        project,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: async (projectId: string) => {
      await deleteProjectService(generatedResumeId, projectId);
    },
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isPending = isAdding || isEditing || isDeleting;

  return {
    isPending,
    addProject,
    editProject,
    deleteProject,
  };
}
