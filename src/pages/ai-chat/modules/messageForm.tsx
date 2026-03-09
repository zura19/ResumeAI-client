import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Message } from "@/lib/types/chat";
import { ArrowUp } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ResponseSuccess } from "@/lib/types/requestResponseTypes";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

interface props {
  isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  // setError: React.Dispatch<React.SetStateAction<string | null>>;
  // messages: Message[];
  // chatId: string;
  sendMessage: UseMutateAsyncFunction<
    ResponseSuccess<Message>,
    Error,
    string,
    unknown
  >;
}

export default function MessageForm({
  isLoading,
  // setIsLoading,
  // setMessages,
  // setError,
  // // messages,
  // chatId,
  sendMessage,
}: props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim() || isLoading) return;

  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     chatId: "1",
  //     sender: "user",
  //     content: input.trim(),
  //   };

  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");
  //   setError(null);
  //   setIsLoading(true);

  //   // Reset textarea height
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = "auto";
  //   }

  //   try {
  //     await new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         // Simulate random error for demo (20% chance)
  //         if (Math.random() < 0.2) {
  //           reject(new Error("Failed to generate resume. Please try again."));
  //         } else {
  //           resolve(null);
  //         }
  //       }, 2000);
  //     });

  //     const assistantMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       sender: "ai",
  //       chatId: "1",
  //       content:
  //         "Here's your generated resume based on your input. [Resume content would appear here]",
  //     };
  //     setMessages((prev) => [...prev, assistantMessage]);
  //   } catch (err) {
  //     setError(
  //       err instanceof Error ? err.message : "An unexpected error occurred",
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await sendMessage(input);
  }

  async function handleEnterClick(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage(input);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="mx-auto max-w-5xl w-full mb-4"
    >
      <div className="relative flex items-end gap-3 rounded-2xl border border-border/50 bg-muted/30 p-2 transition-colors focus-within:border-primary/0 focus-within:bg-muted/50">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          placeholder="Describe your experience, skills, or the type of resume you need..."
          className="min-h-12 max-h-50 flex-1 resize-none border-0 dark:bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          rows={1}
          disabled={isLoading}
          onKeyDown={handleEnterClick}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="size-8 shrink-0 rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 disabled:opacity-50"
        >
          {isLoading ? (
            <Spinner className="size-4" />
          ) : (
            <ArrowUp className="size-4" />
          )}
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </motion.form>
  );
}
