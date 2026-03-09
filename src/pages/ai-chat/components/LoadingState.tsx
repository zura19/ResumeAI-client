import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Sparkles } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/30 to-primary/10 border border-primary/20">
        <Sparkles className="size-5 text-primary" />
      </div>
      <div className="flex-1 rounded-2xl border border-border/50 bg-muted/30 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Spinner className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Generating your resume...
            </p>
            <p className="text-xs text-muted-foreground">
              Analyzing your experience and crafting professional content
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="w-full h-5 rounded-sm" />
          <Skeleton
            className="w-full h-5 rounded-sm"
            style={{ animationDelay: "0.2s" }}
          />
          <Skeleton
            className="w-full h-5 rounded-sm"
            style={{ animationDelay: "0.2s" }}
          />
          <Skeleton
            className="w-full h-5 rounded-sm"
            style={{ animationDelay: "0.3s" }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
