import { deleteAllVersionsService } from "@/lib/services/resume/deleteAllVersionsService";
import { deleteOneVersionsService } from "@/lib/services/resume/deleteOneVersionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UseDeleteResumeActionProps {
  resumeId: string;
  defaultVersion: string;
}

export default function useDeleteResumeAction({
  resumeId,
  defaultVersion,
}: UseDeleteResumeActionProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteAll, isPending: isDeletingAll } = useMutation({
    mutationFn: async () => await deleteAllVersionsService(resumeId),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteOne, isPending: isDeletingOne } = useMutation({
    mutationFn: async () =>
      await deleteOneVersionsService(resumeId, defaultVersion),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["resume", resumeId],
      });
      setOpen(false);
      navigate(`/resume/${resumeId}`, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    open,
    setOpen,
    deleteAll,
    deleteOne,
    isDeletingAll,
    isDeletingOne,
  };
}
