import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateResumeTitleService } from "@/lib/services/resume/updateResumeTitleService";

interface ResumeQueryData {
  resumes: {
    id: string;
    resumeId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
  type: string;
  title: string | null;
}

interface UseChangeResumeTitleActionProps {
  id: string;
  title: string | null;
}

export default function useChangeResumeTitleAction({
  id,
  title,
}: UseChangeResumeTitleActionProps) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title || "");

  useEffect(() => {
    const setter = () => setDraftTitle(title || "");
    setter();
  }, [title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function canSave() {
    const normalizedInitialTitle = (title || "").trim();
    const normalizedDraftTitle = draftTitle.trim();
    return (
      normalizedDraftTitle && normalizedDraftTitle !== normalizedInitialTitle
    );
  }

  const { mutateAsync: changeResumeTitle, isPending } = useMutation({
    mutationFn: async () => updateResumeTitleService(id, draftTitle.trim()),
    onMutate: async () => {
      const nextTitle = draftTitle.trim();

      await queryClient.cancelQueries({
        queryKey: ["resume", id],
      });

      const previousResume = queryClient.getQueryData<ResumeQueryData>([
        "resume",
        id,
      ]);

      queryClient.setQueryData<ResumeQueryData>(["resume", id], (oldData) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          title: nextTitle,
        };
      });

      return { previousResume };
    },
    onSuccess: (response) => {
      queryClient.setQueryData<ResumeQueryData>(["resume", id], (oldData) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          title: response.data.title,
        };
      });

      toast.success("Resume title updated successfully");
      setIsEditing(false);
    },
    onError: (error, _variables, context) => {
      if (context?.previousResume) {
        queryClient.setQueryData(["resume", id], context.previousResume);
      }

      toast.error(error.message);
    },
  });

  function startEditing() {
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraftTitle(title || "");
    setIsEditing(false);
  }

  async function handleSaveTitle() {
    if (!canSave() || isPending) {
      return;
    }

    await changeResumeTitle();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSaveTitle();
    }

    if (event.key === "Escape") {
      cancelEditing();
    }
  }

  return {
    inputRef,
    isEditing,
    draftTitle,
    setDraftTitle,
    canSave,
    isPending,
    startEditing,
    cancelEditing,
    handleSaveTitle,
    handleKeyDown,
  };
}
