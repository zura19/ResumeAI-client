import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { FileTextIcon, DownloadIcon, ZapIcon, DollarSign } from "lucide-react";

const stats = [
  {
    id: "total-resumes",
    label: "Total Resumes",
    icon: FileTextIcon,
    accent: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: DollarSign,
    accent: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    id: "downloads",
    label: "Downloads",
    icon: DownloadIcon,
    accent: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    id: "ai-credits-used",
    label: "AI Credits Used",
    icon: ZapIcon,
    accent: "text-chart-4",
    bg: "bg-chart-4/10",
  },
];

interface props {
  totals?: {
    totalTransactions: number;
    totalResumes: number;
    totalAiCredits: number;
  };
}

export function TotalsSection({ totals }: props) {
  function addNumber(id: string) {
    switch (id) {
      case "transactions":
        return (
          totals?.totalTransactions &&
          formatCurrency(totals.totalTransactions / 100)
        );
      case "total-resumes":
        return totals?.totalResumes;
      case "ai-credits-used":
        return totals?.totalAiCredits;
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-border bg-background/50 backdrop-blur-lg "
        >
          <CardContent className="flex items-center p-4 gap-5 sm:gap-3  flex-col sm:flex-row ">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg  ${stat.bg}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.accent}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-foreground text-center sm:text-start">
                {addNumber(stat.id) ?? 12}
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
