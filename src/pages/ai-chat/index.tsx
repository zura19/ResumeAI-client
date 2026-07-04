import Logo from "@/components/shared/Logo";
import { LoadingState } from "./components/LoadingState";
import MessageForm from "./modules/messageForm";
import ErrorState from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";
import MessageBubble from "./components/MessageBubble";
import ChatSkeleton from "./components/ChatSkeleton";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import useAiChatData from "./hooks/useAiChatData";

export default function AiChat() {
  const {
    resumeId,
    messages,
    messagesEndRef,
    isChatLoading,
    chatError,
    refetch,
    sendMessage,
    isSendingMessage,
    sendMessageError,
    status,
    handleRetry,
    handleSuggestionClick,
    dismissSendMessageError,
    shouldShowSendError,
  } = useAiChatData();

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
                  resumeId={resumeId}
                  message={message}
                />
              ))}

              {isSendingMessage && <LoadingState status={status} />}
              {shouldShowSendError && sendMessageError && (
                <ErrorState
                  error={sendMessageError.message || "Failed to send message"}
                  onRetry={handleRetry}
                  onDismiss={dismissSendMessageError}
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
