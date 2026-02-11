import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { subscriptionDistribution } from "../../admin-data";

const chartConfig = {
  Free: {
    label: "Free",
    color: "hsl(160, 70%, 45%)",
  },
  Pro: {
    label: "Pro",
    color: "hsl(200, 75%, 55%)",
  },
  Enterprise: {
    label: "Enterprise",
    color: "hsl(35, 90%, 56%)",
  },
};

const total = subscriptionDistribution.reduce(
  (sum, item) => sum + item.count,
  0,
);

export function SubscriptionChart() {
  return (
    <Card className="border-border bg-background/50  backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Plan Distribution</CardTitle>
        <CardDescription className="text-muted-foreground">
          Active subscriptions by plan type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="plan" />} />
              <Pie
                data={subscriptionDistribution}
                dataKey="count"
                nameKey="plan"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                strokeWidth={2}
                stroke="hsl(220, 18%, 7%)"
              >
                {subscriptionDistribution.map((entry) => (
                  <Cell key={entry.plan} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 flex items-center justify-center gap-6">
          {subscriptionDistribution.map((item) => (
            <div key={item.plan} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-muted-foreground">
                {item.plan}{" "}
                <span className="font-medium text-foreground">
                  {item.count}
                </span>{" "}
                <span className="text-xs">
                  ({((item.count / total) * 100).toFixed(0)}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
