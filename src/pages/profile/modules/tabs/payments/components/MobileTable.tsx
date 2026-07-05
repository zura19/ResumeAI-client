import { Badge } from "@/components/ui/badge";
import type { Payment } from "@/lib/types/payment";
import { paymentStatusConfig } from "@/pages/profile/configs/paymentStatusConfig";
import { formatPaymentAmount } from "../helpers/formatPaymentAmount";

interface props {
  payments?: Payment[];
}

export default function MobileTable({ payments }: props) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {payments?.map((payment) => {
        const status = paymentStatusConfig[payment.status];
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
                {formatPaymentAmount(payment.amount)}
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
