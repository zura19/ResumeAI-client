import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  CreditCard,
  Sparkles,
  FileText,
} from "lucide-react";
import { totalsService } from "@/lib/services/admin/totalsService";
import { useQuery } from "@tanstack/react-query";
import { calculateGrowth, formatCurrency } from "@/lib/utils";
import TotalsSkeleton from "./components/Skeleton";
import { useMemo } from "react";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import SpotlightCard from "@/components/shared/SpotlightCard";

export function StatCards() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["totals"],
    queryFn: async () => await totalsService(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const totalsData = data?.data;

  const statItems = useMemo(
    () => [
      {
        title: "Total Users",
        value: totalsData?.users.total.toLocaleString(),
        change: calculateGrowth(
          totalsData?.users.thisMonth as number,
          totalsData?.users.lastMonth as number,
        ),
        icon: Users,
      },
      {
        title: "Total Revenue",
        value: formatCurrency((totalsData?.monthlyRevenue as number) / 100),
        change: null,
        icon: DollarSign,
      },
      {
        title: "Active Subscriptions",
        value: totalsData?.subscriptions.total.toLocaleString(),
        change: calculateGrowth(
          totalsData?.subscriptions.thisMonth as number,
          totalsData?.subscriptions.lastMonth as number,
        ),
        icon: CreditCard,
      },

      {
        title: "Resumes Generated",
        value: totalsData?.generatedResumes.total.toLocaleString(),
        change: calculateGrowth(
          totalsData?.generatedResumes.thisMonth as number,
          totalsData?.generatedResumes.lastMonth as number,
        ),
        icon: FileText,
      },
      {
        title: "AI Credits Used",
        value: totalsData?.totalAiCreditsUsed.toLocaleString(),
        change: null,
        icon: Sparkles,
      },
    ],
    [totalsData],
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {isLoading && <TotalsSkeleton />}
      {isError && (
        <ErrorComponent
          onRetry={refetch}
          message={(error as Error).message || "Failed to load stats."}
        />
      )}
      {!isLoading &&
        !isError &&
        statItems.map((item) => (
          <SpotlightCard
            key={item.title}
            cardClassName="border-border bg-background/50 backdrop-blur-lg group"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-indigo-300 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {item.value}
              </div>
              {item?.change !== null && (
                <p className="mt-1 text-xs text-primary">
                  {item.change > 0
                    ? `+${item.change}%`
                    : `${item.change.toFixed(0)}%`}{" "}
                  from last month
                </p>
              )}
            </CardContent>
          </SpotlightCard>
        ))}
    </div>
  );
}
