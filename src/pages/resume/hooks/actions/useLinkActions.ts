import { createLinkService, type LinkBody } from "@/lib/services/resume/edit/createLinkService";
import { updateLinkService } from "@/lib/services/resume/edit/updateLinkService";
import { deleteLinkService } from "@/lib/services/resume/edit/deleteLinkService";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseLinkActionsProps {
  id: string;
  generatedResumeId: string;
  resumeData?: AiGeneratedResume;
}

export default function useLinkActions({
  id,
  generatedResumeId,
}: UseLinkActionsProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: addLink, isPending: isAdding } = useMutation({
    mutationFn: async (link: LinkBody) => {
      const res = await createLinkService(generatedResumeId, link);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Link added successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: updateLink, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      linkId,
      link,
    }: {
      linkId: string;
      link: LinkBody;
    }) => {
      const res = await updateLinkService(generatedResumeId, linkId, link);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Link updated successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: deleteLink, isPending: isDeleting } = useMutation({
    mutationFn: async (linkId: string) => {
      const res = await deleteLinkService(generatedResumeId, linkId);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Link deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["resume", id] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const isPending = isAdding || isUpdating || isDeleting;

  return {
    isPending,
    isAdding,
    isUpdating,
    isDeleting,
    addLink,
    createLink: addLink,
    editLink: updateLink,
    updateLink,
    deleteLink,
  };
}

export { useLinkActions };
