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

const payments = [
  {
    id: "INV-2026-002",
    date: "Feb 7, 2026",
    amount: "$12.00",
    status: "paid" as const,
    method: "Visa ending 4242",
    description: "Pro Plan — Monthly",
  },
  {
    id: "INV-2026-001",
    date: "Jan 7, 2026",
    amount: "$12.00",
    status: "paid" as const,
    method: "Visa ending 4242",
    description: "Pro Plan — Monthly",
  },
  {
    id: "INV-2025-012",
    date: "Dec 7, 2025",
    amount: "$12.00",
    status: "paid" as const,
    method: "Visa ending 4242",
    description: "Pro Plan — Monthly",
  },
  {
    id: "INV-2025-011",
    date: "Nov 7, 2025",
    amount: "$12.00",
    status: "paid" as const,
    method: "Visa ending 4242",
    description: "Pro Plan — Monthly",
  },
  {
    id: "INV-2025-010",
    date: "Oct 7, 2025",
    amount: "$9.00",
    status: "paid" as const,
    method: "Visa ending 4242",
    description: "Starter Plan — Monthly",
  },
  {
    id: "INV-2025-009",
    date: "Sep 7, 2025",
    amount: "$9.00",
    status: "refunded" as const,
    method: "Visa ending 4242",
    description: "Starter Plan — Monthly",
  },
];

const statusConfig = {
  paid: {
    label: "Paid",
    className: "bg-primary/15 text-primary border-primary/25",
  },
  pending: {
    label: "Pending",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/25",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive border-destructive/25",
  },
  refunded: {
    label: "Refunded",
    className: "bg-secondary text-muted-foreground border-border",
  },
};

export function PaymentHistoryTab() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? payments : payments.slice(0, 4);

  return (
    <Card className="border-border bg-background/50 backdrop-blur-lg">
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
              {payments.length} transactions
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
                <TableHead className="text-muted-foreground">Invoice</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">
                  Description
                </TableHead>
                <TableHead className="text-muted-foreground">Method</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Amount
                </TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.map((payment) => {
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
                      {payment.date}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {payment.description}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {payment.method}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm text-foreground">
                      {payment.amount}
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
          {displayed.map((payment) => {
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
                  {payment.description}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{payment.date}</span>
                  <span className="font-mono text-sm text-foreground">
                    {payment.amount}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {payment.method}
                </div>
              </div>
            );
          })}
        </div>

        {payments.length > 4 && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              {showAll
                ? "Show less"
                : `Show all ${payments.length} transactions`}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
