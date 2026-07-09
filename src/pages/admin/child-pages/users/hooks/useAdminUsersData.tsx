import { searchUsersService } from "@/lib/services/admin/searchUsersService";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseAdminUsersDataProps {
  search: string;
}

export default function useAdminUsersData({ search }: UseAdminUsersDataProps) {
  const normalizedSearch = search.trim();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["admin-users", normalizedSearch],
    queryFn: async ({ pageParam }: { pageParam?: string }) =>
      searchUsersService({
        lastId: pageParam,
        limit: 10,
        search: normalizedSearch || undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasMore) return undefined;
      const lastUser = lastPage.data.users[lastPage.data.users.length - 1];
      return lastUser?.id;
    },
    staleTime: 30 * 1000,
  });

  const users =
    data?.pages.flatMap((page) => page.data.users).filter(Boolean) || [];

  return {
    users,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
