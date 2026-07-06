import type { Message } from "@/lib/types/chat";
import type { ResponseSuccess } from "@/lib/types/requestResponseTypes";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useRef, useState } from "react";

interface UseMessageFormActionProps {
  isLoading: boolean;
  sendMessage: UseMutateAsyncFunction<
    ResponseSuccess<Message>,
    Error,
    string,
    unknown
  >;
}

export default function useMessageFormAction({
  isLoading,
  sendMessage,
}: UseMessageFormActionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

  const canSend =
    Boolean(input.trim()) &&
    input.length >= 5 &&
    input.length <= 1000 &&
    !isLoading;

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  }

  async function send() {
    if (!canSend) return;

    const res = await sendMessage(input.trim());
    if (res.success) {
      setInput("");
      textareaRef.current?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await send();
  }

  async function handleEnterClick(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await send();
    }
  }

  return {
    textareaRef,
    input,
    canSend,
    handleTextareaChange,
    handleSubmit,
    handleEnterClick,
  };
}
