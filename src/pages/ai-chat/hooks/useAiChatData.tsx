import type { Message } from "@/lib/types/chat";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSendMessageAction from "./actions/useSendMessageAction";
import { useQuery } from "@tanstack/react-query";
import { getChatService } from "@/lib/services/chat/getChatService";

export default function useAiChatData() {
  const params = useParams();
  const resumeId = params.id as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isErrorDismissed, setIsErrorDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error: chatError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["chat", resumeId],
    queryFn: async () => await getChatService(resumeId),
    refetchOnWindowFocus: false,
  });

  const chatId = data?.data?.id as string;

  const { sendMessage, isSendingMessage, sendMessageError, status } =
    useSendMessageAction(chatId, resumeId, setMessages);

  useEffect(() => {
    const setter = () => setMessages(data?.data?.messages || []);
    if (data) {
      setter();
    }
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSendingMessage]);

  useEffect(() => {
    const setter = () => setIsErrorDismissed(false);
    if (sendMessageError) {
      setter();
    }
  }, [sendMessageError]);

  async function handleRetry() {
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((message) => message.sender === "user");

      if (lastUserMessage) {
        await sendMessage(lastUserMessage.content);
      }
    }
  }

  async function handleSuggestionClick(suggestion: string) {
    await sendMessage(suggestion);
  }

  function dismissSendMessageError() {
    setIsErrorDismissed(true);
  }

  return {
    resumeId,
    messages,
    messagesEndRef,
    isChatLoading: isLoading || isRefetching,
    chatError,
    refetch,
    sendMessage,
    isSendingMessage,
    sendMessageError,
    status,
    handleRetry,
    handleSuggestionClick,
    dismissSendMessageError,
    shouldShowSendError: !!sendMessageError && !isErrorDismissed,
  };
}
