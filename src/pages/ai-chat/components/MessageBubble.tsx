import type { Message } from "@/lib/types/chat";
import { cn } from "@/lib/utils";
import { Sparkles, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function MessageBubble({
  message,
  resumeId,
}: {
  message: Message;
  resumeId: string;
}) {
  const isUser = message.sender === "user";

  return (
    <div className={cn("flex gap-4", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border transition-transform hover:scale-105",
          isUser
            ? "bg-linear-to-br from-primary to-primary/80 border-primary/30"
            : "bg-linear-to-br from-muted to-muted/50 border-border/50",
        )}
      >
        {isUser ? (
          <User className="size-5 text-primary-foreground" />
        ) : (
          <Sparkles className="size-5 text-primary" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-5 py-4 backdrop-blur-sm",
          isUser
            ? "bg-linear-to-br from-primary to-primary/90 text-primary-foreground border border-primary/30"
            : "bg-muted/40 text-foreground border border-border/50",
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        {!isUser && (
          <Link to={`/resume/${resumeId}?version=${message.generatedResumeId}`}>
            {message.generatedResumeId}
          </Link>
        )}
      </div>
    </div>
  );
}
