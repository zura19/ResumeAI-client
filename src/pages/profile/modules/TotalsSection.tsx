import { Card, CardContent } from "@/components/ui/card";
import { FileTextIcon, EyeIcon, DownloadIcon, ZapIcon } from "lucide-react";

const stats = [
  {
    label: "Total Resumes",
    value: "4",
    icon: FileTextIcon,
    accent: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Total Views",
    value: "445",
    icon: EyeIcon,
    accent: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    label: "Downloads",
    value: "117",
    icon: DownloadIcon,
    accent: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    label: "AI Credits Left",
    value: "313",
    icon: ZapIcon,
    accent: "text-chart-4",
    bg: "bg-chart-4/10",
  },
];

export function TotalsSection() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-border bg-background/50 backdrop-blur-lg "
        >
          <CardContent className="flex items-center gap-3 p-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.accent}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
