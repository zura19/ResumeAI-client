import { useState, useRef, useEffect } from "react";
import Logo from "@/components/shared/Logo";
import { LoadingState } from "./components/LoadingState";
import MessageForm from "./modules/messageForm";
import ErrorState from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";
import type { Message } from "@/lib/types/chat";
import MessageBubble from "./components/MessageBubble";
import { useParams } from "react-router-dom";
import { useGetChat, useSendMessage } from "@/lib/hooks/useChat";
import ChatSkeleton from "./components/ChatSkeleton";
import { ErrorComponent } from "@/components/shared/ErrorComponents";

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

  const { sendMessage, isSendingMessage, sendMessageError, status } =
    useSendMessage(data?.data?.id as string, params.id as string, setMessages);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line
      setMessages(data.data?.messages);
    }
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSendingMessage]);

  async function handleRetry() {
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "user");
      if (lastUserMessage) {
        await sendMessage(lastUserMessage.content);
        // setMessages((prev) => prev.filter((m) => m.id !== lastUserMessage.id));
      }
    }
  }

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
                <EmptyState
                  onSuggestionClick={async (suggestion: string) => {
                    await sendMessage(suggestion);
                  }}
                />
              )}

              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  resumeId={params.id as string}
                  message={message}
                />
              ))}

              {isSendingMessage && <LoadingState status={status} />}
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

      <MessageForm isLoading={isSendingMessage} sendMessage={sendMessage} />
    </div>
  );
}
