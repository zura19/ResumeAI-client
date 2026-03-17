import type { Message } from "@/lib/types/chat";
import { cn } from "@/lib/utils";
import { FileText, Sparkles, User } from "lucide-react";
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
        {!isUser && message.generatedResumeId && (
          <Link
            className="flex items-center justify-center bg-indigo-200/10 rounded-2xl p-2 gap-2 mt-4 group transition-all duration-300"
            to={`/resume/${resumeId}?version=${message.generatedResumeId}`}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-300/60 to-primary/0 group-hover:to-indigo-300/80 group-hover:from-primary/0 text-foreground transition-all duration-300">
              <FileText className="size-5 text-indigo-200" />
            </div>
            <p className=" text-indigo-200 transition-all duration-300">
              View Resume
            </p>
          </Link>
        )}

        {!isUser && !message.generatedResumeId && (
          <div className="flex items-center justify-center p-2 bg-red-300/15 gap-2 mt-4 rounded-2xl group transition-all duration-300 ">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-red-300/60 to-primary/0 group-hover:to-red-300/80 group-hover:from-primary/0 text-foreground transition-all duration-300">
              <FileText className="size-5 text-red-200" />
            </div>
            <p className="text-red-400">Resume has been deleted</p>
          </div>
        )}
      </div>
    </div>
  );
}
