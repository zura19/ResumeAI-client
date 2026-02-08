import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { getSubscriptionDataService } from "@/lib/services/subscription/getSubscriptionData";
import {
  calculateDaysLeft,
  calculateProgress,
  formatCurrency,
  formatDate,
  uppercaseFirstLetter,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  CrownIcon,
  CalendarIcon,
  CreditCardIcon,
  ZapIcon,
  CheckIcon,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export function SubscriptionCardTab() {
  const { ref, inView } = useInView();
  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription", inView],
    queryFn: async () => await getSubscriptionDataService(),
    enabled: inView,
    staleTime: 1 * 60 * 60 * 1000, // 1 hour
  });

  const { subscription, userActions } = data?.data || {};
  const { plan } = subscription || {};

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
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30 ">
                  <CrownIcon className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-lg text-foreground">
                    {uppercaseFirstLetter(plan?.name || "")} Plan
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {formatCurrency(Number(plan?.priceMonthly) / 100 || 0)}
                    /Month
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/25 text-sm tracking-wider hover:bg-chart-2/20">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Next Payment */}
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-card/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  Next payment
                </div>
                <span className="text-sm font-medium text-foreground">
                  {formatDate(subscription?.currentPeriodEnd + "")}
                </span>
              </div>
              <Progress
                value={calculateProgress(
                  subscription?.currentPeriodStart + "",
                  subscription?.currentPeriodEnd + "",
                )}
                className="h-1.5 "
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatDate(subscription?.currentPeriodStart + "")}</span>
                <span>
                  {calculateDaysLeft(subscription?.currentPeriodEnd + "")} days
                  remaining
                </span>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Resumes</span>
                  <span className="font-mono text-xs text-foreground">
                    {userActions?.generatedResumesThisMonth}/
                    {plan?.totalResumes}
                  </span>
                </div>
                <Progress
                  value={
                    (Number(userActions?.generatedResumesThisMonth) /
                      Number(plan?.totalResumes)) *
                    100
                  }
                  className="h-1.5"
                />
              </div>
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">AI Credits</span>
                  <span className="font-mono text-xs text-foreground">
                    {userActions?.aiCreditsThisMonth}/{plan?.aiCreditsPerMonth}
                  </span>
                </div>
                <Progress
                  value={
                    (Number(userActions?.aiCreditsThisMonth) /
                      Number(plan?.aiCreditsPerMonth)) *
                    100
                  }
                  className="h-1.5"
                />
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Included Features
              </span>
              <div className="grid gap-1.5">
                {plan?.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-border text-muted-foreground hover:text-foreground hover:bg-secondary bg-transparent"
              >
                <CreditCardIcon className="h-4 w-4" />
                Manage Billing
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link to="/plans">
                  <ZapIcon className="h-4 w-4" />
                  {plan?.name === "enterprise" ? "Change Plan" : "Upgrade Plan"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
