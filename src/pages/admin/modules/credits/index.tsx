import {
  Bar,
  BarChart,
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
import { aiCreditsData } from "../../admin-data";

const chartConfig = {
  used: {
    label: "Credits Used",
    color: "hsl(160, 70%, 45%)",
  },
  total: {
    label: "Credits Available",
    color: "hsl(220, 15%, 20%)",
  },
};

export function AiCreditsChart() {
  return (
    <Card className="border-border bg-background/50  backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-foreground">AI Credits Usage</CardTitle>
        <CardDescription className="text-muted-foreground">
          Monthly AI credits consumed vs. total available
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aiCreditsData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
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
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="used"
                fill="var(--color-used)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
