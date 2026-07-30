import { createExperienceService } from "@/lib/services/resume/edit/createExperienceService";
import { updateExperienceService } from "@/lib/services/resume/edit/updateExperienceService";
import { deleteExperienceService } from "@/lib/services/resume/edit/deleteExperienceService";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseEditExperienceActionProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

type ExperienceItem = AiGeneratedResume["experience"][0];

export default function useEditExperienceAction({
  id,
  generatedResumeId,
}: UseEditExperienceActionProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: addExperience, isPending: isAdding } = useMutation({
    mutationFn: async (experience: ExperienceItem) => {
      const res = await createExperienceService(generatedResumeId, experience);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Experience added successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: editExperience, isPending: isEditing } = useMutation({
    mutationFn: async ({
      experienceId,
      experience,
    }: {
      experienceId: string;
      experience: ExperienceItem;
    }) => {
      const res = await updateExperienceService(
        generatedResumeId,
        experienceId,
        experience,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Experience updated successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: deleteExperience, isPending: isDeleting } = useMutation({
    mutationFn: async (experienceId: string) => {
      const res = await deleteExperienceService(generatedResumeId, experienceId);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Experience deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isPending = isAdding || isEditing || isDeleting;

  return {
    isPending,
    addExperience,
    editExperience,
    deleteExperience,
  };
}
