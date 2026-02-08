import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface props {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorComponent({ title, message, onRetry, className }: props) {
  return (
    // <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <Card
      className={`w-full max-w-md border-destructive/10 shadow-lg bg-card/50 backdrop-blur-lg ${className}`}
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-xl">
          {title || "Something went wrong"}
        </CardTitle>
        <CardDescription className="text-base">{message}</CardDescription>
      </CardHeader>
      {onRetry && (
        <CardContent className="flex justify-center">
          <Button onClick={onRetry} variant="default">
            Try Again
          </Button>
        </CardContent>
      )}
    </Card>
    // </div>
  );
}
