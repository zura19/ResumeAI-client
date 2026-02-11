import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
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
import { revenueData } from "../../admin-data";

const chartConfig = {
  revenue: {
    label: "Revenue ($)",
    color: "hsl(160, 70%, 45%)",
  },
  users: {
    label: "Users",
    color: "hsl(200, 75%, 55%)",
  },
};

const formattedData = revenueData.map((d) => ({
  ...d,
  revenue: d.revenue / 100,
}));

export default function RevenueChart() {
  return (
    <Card className="border-border bg-background/50  backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Revenue & User Growth</CardTitle>
        <CardDescription className="text-muted-foreground">
          Monthly revenue and user acquisition over the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(160, 70%, 45%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(160, 70%, 45%)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(200, 75%, 55%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(200, 75%, 55%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220, 15%, 14%)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
              />
              <YAxis
                yAxisId="revenue"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis
                yAxisId="users"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                fill="url(#fillRevenue)"
                strokeWidth={2}
              />
              <Area
                yAxisId="users"
                type="monotone"
                dataKey="users"
                stroke="var(--color-users)"
                fill="url(#fillUsers)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
