import { usersService } from "@/lib/services/admin/userService";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useAdminRecentUsersData() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recentUsers"],
    queryFn: async ({ pageParam }: { pageParam?: string }) =>
      usersService(pageParam, 10),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasMore) return undefined;
      const lastUser = lastPage.data.users[lastPage.data.users.length - 1];
      return lastUser.id;
    },
    staleTime: 24 * 60 * 60 * 1000,
  });

  const recentUsers =
    data?.pages.flatMap((page) => page?.data.users).filter(Boolean) || [];

  return {
    recentUsers,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
