import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateResumeTitleService } from "@/lib/services/resume/updateResumeTitleService";

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

  console.log(!!draftTitle);

  function canSave() {
    const normalizedInitialTitle = (title || "").trim();
    const normalizedDraftTitle = draftTitle.trim();
    return (
      normalizedDraftTitle && normalizedDraftTitle !== normalizedInitialTitle
    );
  }

  const { mutateAsync: changeResumeTitle, isPending } = useMutation({
    mutationFn: async () => updateResumeTitleService(id, draftTitle),
    onSuccess: () => {
      toast.success("Resume title updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["resume", id],
      });
      setIsEditing(false);
    },
    onError: (error) => {
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
