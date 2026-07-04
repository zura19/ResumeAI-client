import { getPlansByNameService } from "@/lib/services/plan/getPlanByName";
import type { PlanName } from "@/lib/types/plan";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useDetailedPlanData() {
  const params = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["plan", params.id],
    queryFn: () => getPlansByNameService(params.id as PlanName),
    staleTime: 3 * 60 * 60 * 1000,
    enabled: !!params.id,
  });

  return {
    plan: data?.data,
    isLoading,
    isError,
    error,
  };
}
