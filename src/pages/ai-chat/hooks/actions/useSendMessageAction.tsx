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

  useEffect(() => {
    socket.emit("join", user?.id);
  }, [user?.id]);

  useEffect(() => {
    socket.on("resume:update:status", (data) => {
      setStatus(data.message);
    });

    return () => {
      socket.off("resume:update:status");
    };
  }, []);

  const {
    mutateAsync: sendMessage,
    isPending: isSendingMessage,
    error: sendMessageError,
  } = useMutation({
    mutationFn: async (message: string) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          content: message,
          id: Date.now().toString(),
          chatId,
        },
      ]);

      return await sendMessageService(resumeId, message.trim());
    },
    onSuccess: (data) => {
      toast.success("Message sent successfully");
      queryClient.invalidateQueries({
        queryKey: ["resume", resumeId],
      });
      setMessages((prev) => [...prev, data.data]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { sendMessage, isSendingMessage, sendMessageError, status };
}
