"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ReceiptIcon, DownloadIcon, ChevronDownIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserPaymentsService } from "@/lib/services/payment/getUserPayments";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { formatDate } from "date-fns";
import { formatCurrency } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  SUCCEEDED: {
    label: "Paid",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/25",
  },
  PROCESSING: {
    label: "Pending",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/25",
  },
  FAILED: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive border-destructive/25",
  },
  REQUIRES_CONFIRMATION: {
    label: "Pending",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/25",
  },
  REQUIRES_PAYMENT_METHOD: {
    label: "Pending",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/25",
  },
};

export function PaymentHistoryTab() {
  const { ref, inView } = useInView();
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["payment-history", showAll],
    queryFn: async () => await getUserPaymentsService(showAll ? 100 : 5),
    enabled: inView,
    staleTime: 1 * 60 * 60 * 1000, // 1 hour
  });
  const payments = data?.data;

  const displayed = showAll ? payments : payments?.slice(0, 4);

  console.log(payments);

  return (
    <Card ref={ref} className="border-border bg-background/50 backdrop-blur-lg">
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {isLoading && (
        <div className="flex items-center justify-center h-100">
          <Spinner className="size-6.5 animate-spin" />
        </div>
      )}
      {!isLoading && !error && (
        <>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30 ">
                <ReceiptIcon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <CardTitle className="text-lg text-foreground">
                  Payment History
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {payments?.length} transactions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">
                      Invoice
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Date
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Description
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Method
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-right text-muted-foreground">
                      Amount
                    </TableHead>
                    <TableHead className="w-10">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayed?.map((payment) => {
                    const status = statusConfig[payment.status];
                    return (
                      <TableRow
                        key={payment.id}
                        className="border-border hover:bg-secondary/30"
                      >
                        <TableCell className="font-mono text-xs text-foreground">
                          {payment.id}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(payment.createdAt, "yyyy-MM-dd")}
                        </TableCell>
                        <TableCell className="text-sm text-foreground">
                          {/* {payment.description} */}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          N / A
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={status.className}>
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm text-foreground">
                          {formatCurrency(payment.amount / 100)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
                            aria-label={`Download invoice ${payment.id}`}
                          >
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {displayed?.map((payment) => {
                const status = statusConfig[payment.status];
                return (
                  <div
                    key={payment.id}
                    className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">
                        {payment.id}
                      </span>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </div>
                    <div className="text-sm text-foreground">
                      {/* {payment.description} */}
                    </div>
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

            {payments && (
              <div className="mt-4 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAll(!showAll)}
                  className="gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  {showAll ? "Show less" : `Show all  transactions`}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                  />
                </Button>
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
