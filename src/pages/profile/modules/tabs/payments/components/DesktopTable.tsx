import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Payment } from "@/lib/types/payment";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "date-fns";
import { DownloadIcon } from "lucide-react";
import { statusConfig } from "../statusConfig";

interface props {
  payments?: Payment[];
}

export default function DesktopTable({ payments }: props) {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Invoice</TableHead>
            <TableHead className="text-muted-foreground">Date</TableHead>
            <TableHead className="text-muted-foreground">Description</TableHead>
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
          {payments?.map((payment) => {
            const status = statusConfig[payment.status];
            return (
              <TableRow
                key={payment.id}
                className="border-border hover:bg-secondary/30"
              >
                <TableCell className="font-mono text-xs text-foreground">
                  {payment.invoice}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDate(payment.createdAt, "yyyy-MM-dd")}
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  -{/* {payment.description} */}
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
  );
}
