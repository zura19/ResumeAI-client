import { paymentsService } from "@/lib/services/admin/paymentsService";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useAdminRecentPaymentsData() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["payments"],
    queryFn: async ({ pageParam }: { pageParam?: string }) => {
      const response = await paymentsService(pageParam, 10);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      const lastPayment = lastPage.payments[lastPage.payments.length - 1];
      return lastPayment.id;
    },
    initialPageParam: undefined,
  });

  const payments =
    data?.pages.flatMap((page) => page?.payments).filter(Boolean) || [];

  return {
    payments,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
