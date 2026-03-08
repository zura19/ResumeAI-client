import { FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function EmptyState({
  onSuggestionClick,
}: {
  onSuggestionClick: (suggestion: string) => void;
}) {
  const suggestions = [
    "I'm a software engineer with 5 years of experience in React and Node.js",
    "Create a resume for a marketing manager position",
    "Help me highlight my leadership skills and project management experience",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="relative mb-8">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/20 blur-xl" />
        <div className="relative flex size-20 items-center justify-center rounded-2xl border border-primary/30 bg-linear-to-br from-primary/20 to-primary/5">
          <FileText className="size-10 text-primary" />
        </div>
      </div>

      <h2 className="mb-3 text-2xl font-semibold text-foreground">
        AI Resume Generator
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground leading-relaxed">
        Tell me about your work experience, skills, and education. I&apos;ll
        help you create a professional resume tailored to your goals.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-lg">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
          Try these prompts
        </p>
        {suggestions.map((suggestion, i) => (
          <SuggestionChip
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            order={i}
          >
            {suggestion}
          </SuggestionChip>
        ))}
      </div>
    </motion.div>
  );
}

function SuggestionChip({
  children,
  onClick,
  order,
}: {
  children: React.ReactNode;
  onClick: () => void;
  order: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: order * 0.1 }}
      type="button"
      onClick={onClick}
      className="group w-full rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-left text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
    >
      <span className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary/50 transition-colors group-hover:text-primary" />
        <span className="line-clamp-1">{children}</span>
      </span>
    </motion.button>
  );
}
