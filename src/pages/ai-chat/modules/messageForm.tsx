import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Message } from "@/lib/types/chat";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import type { ResponseSuccess } from "@/lib/types/requestResponseTypes";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import useMessageFormAction from "../hooks/actions/useMessageFormAction";

interface props {
  isLoading: boolean;
  sendMessage: UseMutateAsyncFunction<
    ResponseSuccess<Message>,
    Error,
    string,
    unknown
  >;
}

export default function MessageForm({ isLoading, sendMessage }: props) {
  const {
    textareaRef,
    input,
    canSend,
    handleTextareaChange,
    handleSubmit,
    handleEnterClick,
  } = useMessageFormAction({
    isLoading,
    sendMessage,
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="mx-auto max-w-5xl w-full mb-4 "
    >
      <div className="relative flex flex-col items-end gap-3 rounded-2xl border border-border/50 bg-muted/30 p-2 transition-colors focus-within:border-primary/0 focus-within:bg-muted/50">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          placeholder="Describe your experience, skills, or the type of resume you need..."
          className="min-h-1 max-h-50 flex-1 resize-none border-0 dark:bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          rows={1}
          disabled={isLoading}
          onKeyDown={handleEnterClick}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
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
