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
import { formatCurrency, formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import InfiniteLoader from "@/components/shared/InfiniteLoader";
import useAdminRecentPaymentsData from "@/pages/admin/hooks/useAdminRecentPaymentsData";
import { getPaymentStatusClasses } from "@/pages/admin/constants/paymentStatusClasses";

export function RecentPaymentsTable() {
  const {
    payments,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAdminRecentPaymentsData();

  if (isLoading) return <Skeleton className="h-100 w-full rounded-md" />;
  if (isError)
    return (
      <ErrorComponent
        message={error?.message || "Unable to load recent payments."}
      />
    );

  if (!isLoading && !isError)
    return (
      <Card className="border-border bg-background/50  backdrop-blur-lg max-h-125 overflow-scroll scrollbar-hide">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Payments</CardTitle>
          <CardDescription className="text-muted-foreground">
            Latest payment transactions from Stripe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Invoice</TableHead>
                <TableHead className="text-muted-foreground">
                  Customer
                </TableHead>
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
              {payments.map((payment) => (
                <TableRow key={payment.id} className="border-border">
                  <TableCell className="font-mono text-sm text-foreground">
                    {payment.invoice}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {payment.user.firstName} {payment.user.lastName}
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
                    {formatCurrency(payment.amount / 100, payment.currency)}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatDate(payment.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <InfiniteLoader
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </CardContent>
      </Card>
    );
}
