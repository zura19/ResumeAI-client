import { createEducationService } from "@/lib/services/resume/edit/createEducationService";
import { updateEducationService } from "@/lib/services/resume/edit/updateEducationService";
import { deleteEducationService } from "@/lib/services/resume/edit/deleteEducationService";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseEditEducationActionProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

type EducationItem = AiGeneratedResume["education"][0];

export default function useEditEducationAction({
  id,
  generatedResumeId,
}: UseEditEducationActionProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: addEducation, isPending: isAdding } = useMutation({
    mutationFn: async (education: EducationItem) => {
      const res = await createEducationService(generatedResumeId, education);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Education added successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: editEducation, isPending: isEditing } = useMutation({
    mutationFn: async ({
      educationId,
      education,
    }: {
      educationId: string;
      education: EducationItem;
    }) => {
      const res = await updateEducationService(
        generatedResumeId,
        educationId,
        education,
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Education updated successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: deleteEducation, isPending: isDeleting } = useMutation({
    mutationFn: async (educationId: string) => {
      const res = await deleteEducationService(generatedResumeId, educationId);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Education deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isPending = isAdding || isEditing || isDeleting;

  return {
    isPending,
    addEducation,
    editEducation,
    deleteEducation,
  };
}
