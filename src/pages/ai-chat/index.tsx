import { useState, useRef, useEffect } from "react";
import Logo from "@/components/shared/Logo";
import { LoadingState } from "./components/LoadingState";
import MessageForm from "./modules/messageForm";
import ErrorState from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";
import type { Message } from "@/lib/types/chat";
import MessageBubble from "./components/MessageBubble";
import { useParams } from "react-router-dom";
import { useGetChat } from "@/lib/hooks/useChat";
import ChatSkeleton from "./components/ChatSkeleton";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { sendMessageService } from "@/lib/services/chat/sendMessageService";

export default function AiChat() {
  const params = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading: isChatLoading,
    error: chatError,
    refetch,
  } = useGetChat(params.id as string);

  console.log(data);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line
      setMessages(data.data?.messages);
    }
  }, [data]);

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
          chatId: data?.data?.id as string,
        },
      ]);

      const aiAnswer = await sendMessageService(
        params.id as string,
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSendingMessage]);

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "user");
      if (lastUserMessage) {
        setMessages((prev) => prev.filter((m) => m.id !== lastUserMessage.id));
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    console.log(suggestion);
  };

  if (chatError) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <ErrorComponent message={chatError.message} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col">
      <div className="bg-card/30 backdrop-blur-xl  p-4">
        <Logo />
      </div>
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-5xl space-y-6">
          {isChatLoading && <ChatSkeleton />}

          {!isChatLoading && !chatError && (
            <>
              {messages.length === 0 && !isSendingMessage && (
                <EmptyState onSuggestionClick={handleSuggestionClick} />
              )}

              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  resumeId={params.id as string}
                  message={message}
                />
              ))}

              {isSendingMessage && <LoadingState />}
              {sendMessageError && (
                <ErrorState
                  error={sendMessageError.message || "Failed to send message"}
                  onRetry={handleRetry}
                  onDismiss={() => {
                    console.log("dismiss");
                  }}
                />
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      <MessageForm
        isLoading={isSendingMessage}
        // setIsLoading={}
        // setMessages={setMessages}
        // setError={sendMessageError?.message}
        // messages={messages}
        // chatId={data?.data.id as string}
        sendMessage={sendMessage}
      />
    </div>
  );
}
