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

export default function AiChat() {
  const params = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleRetry = () => {
    setError(null);
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.sender === "user");
      if (lastUserMessage) {
        // setInput(lastUserMessage.content);
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
              {messages.length === 0 && !isLoading && (
                <EmptyState onSuggestionClick={handleSuggestionClick} />
              )}

              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isLoading && <LoadingState />}
              {error && (
                <ErrorState
                  error={error}
                  onRetry={handleRetry}
                  onDismiss={() => setError(null)}
                />
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      <MessageForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setMessages={setMessages}
        setError={setError}
        messages={messages}
      />
    </div>
  );
}
