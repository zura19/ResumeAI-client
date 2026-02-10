import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReceiptIcon, ChevronDownIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserPaymentsService } from "@/lib/services/payment/getUserPayments";
import { Spinner } from "@/components/ui/spinner";
import DesktopTable from "./components/DesktopTable";
import MobileTable from "./components/MobileTable";
import { ErrorComponent } from "@/components/shared/ErrorComponents";

export function PaymentHistoryTab() {
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["payment-history", showAll],
    queryFn: async () => await getUserPaymentsService(showAll ? 100 : 5),
    staleTime: 1 * 60 * 60 * 1000, // 1 hour
  });
  const payments = data?.data;

  if (error)
    return (
      <ErrorComponent
        className="max-w-full min-h-100 bg-background/50 backdrop-blur-lg"
        title="Something went wrong"
        message={error.message}
        onRetry={refetch}
      />
    );

  return (
    <Card className="border-border bg-background/50 backdrop-blur-lg min-h-100">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner className="size-6 text-primary animate-spin" />
        </div>
      )}
      {!isLoading && (
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
            <DesktopTable payments={payments} />
            <MobileTable payments={payments} />

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
