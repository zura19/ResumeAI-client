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
import { useInfiniteQuery } from "@tanstack/react-query";
import { paymentsService } from "@/lib/services/admin/paymentsService";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import InfiniteLoader from "@/components/shared/InfiniteLoader";

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

export function RecentPaymentsTable() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["payments"],
    queryFn: async ({ pageParam }: { pageParam?: string }) => {
      const response = await paymentsService(pageParam, 10);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      const lastPayment = lastPage.payments[lastPage.payments.length - 1];
      return lastPayment.id;
    },
    initialPageParam: undefined,
  });

  const payments =
    data?.pages.flatMap((page) => page?.payments).filter(Boolean) || [];

  if (isLoading) return <Skeleton className="h-85 w-full rounded-md" />;
  if (isError) return <ErrorComponent message={error.message} />;

  if (!isLoading && !isError)
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
