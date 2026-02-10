import { Progress } from "@/components/ui/progress";
import { calculateDaysLeft, calculateProgress, formatDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface Props {
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
}

export default function NextPayment({
  currentPeriodEnd,
  currentPeriodStart,
}: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          Next payment
        </div>
        <span className="text-sm font-medium text-foreground">
          {formatDate(currentPeriodEnd + "")}
        </span>
      </div>
      <Progress
        value={calculateProgress(
          currentPeriodStart + "",
          currentPeriodEnd + "",
        )}
        className="h-1.5 "
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatDate(currentPeriodStart + "")}</span>
        <span>{calculateDaysLeft(currentPeriodEnd + "")} days remaining</span>
      </div>
    </div>
  );
}
