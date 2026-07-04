import { countSubscriptionsService } from "@/lib/services/admin/countSubscriptionsService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { subscriptionChartConfig } from "@/pages/admin/configs/subscriptionChartConfig";

export default function useAdminSubscriptionsData() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["planCounts"],
    queryFn: async () => await countSubscriptionsService(),
  });

  const displayData = useMemo(
    () => [
      {
        plan: "Free",
        count: data?.data?.free || 0,
        fill: subscriptionChartConfig.Free.color,
      },
      {
        plan: "Pro",
        count: data?.data?.pro || 0,
        fill: subscriptionChartConfig.Pro.color,
      },
      {
        plan: "Enterprise",
        count: data?.data?.enterprise || 0,
        fill: subscriptionChartConfig.Enterprise.color,
      },
    ],
    [data],
  );

  const total = displayData.reduce((sum, item) => sum + item.count, 0);

  return {
    displayData,
    total,
    isLoading,
    isError,
    error,
  };
}
