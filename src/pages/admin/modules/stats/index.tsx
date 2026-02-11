import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  CreditCard,
  Sparkles,
  FileText,
  TrendingUp,
} from "lucide-react";
import { stats } from "../../admin-data";

const statItems = [
  {
    title: "Total Users",
    value: stats.totalUsers.toLocaleString(),
    change: `+${stats.usersGrowth}%`,
    icon: Users,
  },
  {
    title: "Monthly Revenue",
    value: `$${(stats.totalRevenue / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    change: `+${stats.revenueGrowth}%`,
    icon: DollarSign,
  },
  {
    title: "Active Subscriptions",
    value: stats.activeSubscriptions.toLocaleString(),
    change: `+${stats.subscriptionGrowth}%`,
    icon: CreditCard,
  },
  {
    title: "AI Credits Used",
    value: stats.totalAiCredits.toLocaleString(),
    change: `+${stats.aiCreditsGrowth}%`,
    icon: Sparkles,
  },
  {
    title: "Resumes Generated",
    value: stats.totalResumes.toLocaleString(),
    change: `+${stats.resumesGrowth}%`,
    icon: FileText,
  },
  {
    title: "MRR",
    value: `$${(stats.mrr / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    change: `+${stats.mrrGrowth}%`,
    icon: TrendingUp,
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {statItems.map((item) => (
        <Card
          key={item.title}
          className="border-border bg-background/50 backdrop-blur-lg"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {item.value}
            </div>
            <p className="mt-1 text-xs text-primary">
              {item.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
