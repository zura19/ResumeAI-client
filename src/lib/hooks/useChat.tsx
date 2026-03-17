import { useMutation, useQuery } from "@tanstack/react-query";
import { getChatService } from "../services/chat/getChatService";
import { sendMessageService } from "../services/chat/sendMessageService";
import { socket } from "../configs/socket";
import { useUser } from "../store/userState";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Message } from "../types/chat";

export function useGetChat(id: string) {
  return useQuery({
    queryKey: ["chat", id],
    queryFn: async () => await getChatService(id),
  });
}

export function useSendMessage(
  chatId: string,
  resumeId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) {
  const { user } = useUser();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    socket.emit("join", user?.id);
  }, [user?.id]);

  useEffect(() => {
    socket.on("resume:update:status", (data) => {
      console.log(data);
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
          chatId: chatId as string,
        },
      ]);

      const aiAnswer = await sendMessageService(
        resumeId as string,
        message.trim(),
      );
      return aiAnswer;
    },
    onSuccess: (data) => {
      toast.success("Message sent successfully");
      setMessages((prev) => [...prev, data.data]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { sendMessage, isSendingMessage, sendMessageError, status };
}
