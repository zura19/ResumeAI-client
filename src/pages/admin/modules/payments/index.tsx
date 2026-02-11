import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { recentPayments } from "../../admin-data";

function getPaymentStatusClasses(status: string) {
  switch (status) {
    case "SUCCEEDED":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    case "FAILED":
      return "border-red-500/30 bg-red-500/10 text-red-400";
    case "PROCESSING":
      return "border-sky-500/30 bg-sky-500/10 text-sky-400";
    case "REQUIRES_PAYMENT_METHOD":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    default:
      return "border-border bg-secondary text-muted-foreground";
  }
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RecentPaymentsTable() {
  return (
    <Card className="border-border bg-background/50  backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Payments</CardTitle>
        <CardDescription className="text-muted-foreground">
          Latest payment transactions from Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Invoice</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Amount
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayments.map((payment) => (
              <TableRow key={payment.id} className="border-border">
                <TableCell className="font-mono text-sm text-foreground">
                  {payment.invoice}
                </TableCell>
                <TableCell className="text-foreground">
                  {payment.userName}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getPaymentStatusClasses(payment.status)}
                  >
                    {payment.status.toLowerCase().replace(/_/g, " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-foreground">
                  {formatCurrency(payment.amount, payment.currency)}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {formatDate(payment.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
