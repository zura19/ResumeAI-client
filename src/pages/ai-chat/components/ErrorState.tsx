import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, X } from "lucide-react";

interface props {
  error: string;
  onRetry: () => void;
  onDismiss: () => void;
}

export default function ErrorState({ error, onRetry, onDismiss }: props) {
  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/20">
            <AlertCircle className="size-5 text-destructive" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-destructive mb-1">
              Generation Failed
            </h4>
            <p className="text-sm text-destructive/80">{error}</p>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <RefreshCw className="mr-2 size-4" />
                Try Again
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="text-destructive/60 hover:text-destructive hover:bg-destructive/10"
              >
                <X className="mr-2 size-4" />
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
