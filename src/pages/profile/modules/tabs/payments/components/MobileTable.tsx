import { Badge } from "@/components/ui/badge";
import { statusConfig } from "../statusConfig";
import type { Payment } from "@/lib/types/payment";

interface props {
  payments?: Payment[];
}

export default function MobileTable({ payments }: props) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {payments?.map((payment) => {
        const status = statusConfig[payment.status];
        return (
          <div
            key={payment.id}
            className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                {payment.invoice}
              </span>
              <Badge variant="outline" className={status.className}>
                {status.label}
              </Badge>
            </div>
            <div className="text-sm text-foreground">-</div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{payment.createdAt}</span>
              <span className="font-mono text-sm text-foreground">
                {payment.amount}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {payment.status}
            </div>
          </div>
        );
      })}
    </div>
  );
}
