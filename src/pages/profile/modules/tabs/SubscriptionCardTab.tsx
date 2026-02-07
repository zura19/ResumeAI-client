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
import {
  CrownIcon,
  CalendarIcon,
  CreditCardIcon,
  ZapIcon,
  CheckIcon,
} from "lucide-react";

const plan = {
  name: "Pro",
  price: "$12",
  interval: "month",
  nextPayment: "March 7, 2026",
  currentPeriodStart: "Feb 7, 2026",
  currentPeriodEnd: "Mar 7, 2026",
  daysLeft: 28,
  daysTotal: 28,
  resumesUsed: 4,
  resumesLimit: 25,
  aiCreditsUsed: 187,
  aiCreditsLimit: 500,
  features: [
    "Unlimited resume templates",
    "AI-powered content suggestions",
    "Custom domain sharing",
    "Priority support",
    "Analytics dashboard",
  ],
};

export function SubscriptionCardTab() {
  const periodProgress =
    ((plan.daysTotal - plan.daysLeft) / plan.daysTotal) * 100;

  return (
    <Card className="border-border bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30 ">
              <CrownIcon className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-lg text-foreground">
                {plan.name} Plan
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {plan.price}/Month
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
              {plan.nextPayment}
            </span>
          </div>
          <Progress value={periodProgress} className="h-1.5 " />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{plan.currentPeriodStart}</span>
            <span>{plan.daysLeft} days remaining</span>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Resumes</span>
              <span className="font-mono text-xs text-foreground">
                {plan.resumesUsed}/{plan.resumesLimit}
              </span>
            </div>
            <Progress
              value={(plan.resumesUsed / plan.resumesLimit) * 100}
              className="h-1.5"
            />
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">AI Credits</span>
              <span className="font-mono text-xs text-foreground">
                {plan.aiCreditsUsed}/{plan.aiCreditsLimit}
              </span>
            </div>
            <Progress
              value={(plan.aiCreditsUsed / plan.aiCreditsLimit) * 100}
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
            {plan.features.map((feature) => (
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
          >
            <ZapIcon className="h-4 w-4" />
            Upgrade Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
