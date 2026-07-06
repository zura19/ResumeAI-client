import { socket } from "@/lib/configs/socket";
import { sendMessageService } from "@/lib/services/chat/sendMessageService";
import { useUser } from "@/lib/store/userState";
import type { Message } from "@/lib/types/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useSendMessageAction(
  chatId: string,
  resumeId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<string | null>(null);
  const [failedMessageContent, setFailedMessageContent] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!user?.id) return;

    socket.emit("join", user.id);

    return () => {
      socket.emit("leave", user.id);
    };
  }, [user?.id]);

  useEffect(() => {
    const handleResumeStatusUpdate = (data: { message: string }) => {
      setStatus(data.message);
    };

    socket.on("resume:update:status", handleResumeStatusUpdate);

    return () => {
      socket.off("resume:update:status", handleResumeStatusUpdate);
    };
  }, []);

  const {
    mutateAsync: sendMessage,
    isPending: isSendingMessage,
    error: sendMessageError,
  } = useMutation({
    mutationFn: async (message: string) => {
      return await sendMessageService(resumeId, message.trim());
    },
    onMutate: (message: string) => {
      const optimisticMessageId = `optimistic-${Date.now()}-${Math.random()}`;

      setFailedMessageContent(null);
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          content: message,
          id: optimisticMessageId,
          chatId,
        },
      ]);

      return { optimisticMessageId, message };
    },
    onSuccess: (data) => {
      toast.success("Message sent successfully");
      queryClient.invalidateQueries({
        queryKey: ["resume", resumeId],
      });
      setFailedMessageContent(null);
      setMessages((prev) => [...prev, data.data]);
    },
    onError: (error, message, context) => {
      setFailedMessageContent(message);
      setMessages((prev) =>
        prev.filter(
          (currentMessage) =>
            currentMessage.id !== context?.optimisticMessageId,
        ),
      );
      toast.error(error.message);
    },
  });

  return {
    sendMessage,
    isSendingMessage,
    sendMessageError,
    failedMessageContent,
    status,
  };
}
