import { totalsService } from "@/lib/services/admin/totalsService";
import { calculateGrowth, formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  CreditCard,
  DollarSign,
  FileText,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo } from "react";

export default function useAdminStatsData() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["totals"],
    queryFn: async () => await totalsService(),
    staleTime: 24 * 60 * 60 * 1000,
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
        value: formatCurrency((totalsData?.totalRevenue.total as number) / 100),
        change: calculateGrowth(
          (totalsData?.totalRevenue.thisMonth as number) / 100,
          (totalsData?.totalRevenue.lastMonth as number) / 100,
        ),
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

  return {
    statItems,
    isLoading,
    isError,
    error,
    refetch,
  };
}
