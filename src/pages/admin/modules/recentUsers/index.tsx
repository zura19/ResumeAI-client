import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserTableRow from "./components/Row";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usersService } from "@/lib/services/admin/userService";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import { Skeleton } from "@/components/ui/skeleton";
import InfiniteLoader from "@/components/shared/InfiniteLoader";

export function RecentUsersTable() {
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
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  const recentUsers =
    data?.pages.flatMap((page) => page?.data.users).filter(Boolean) || [];

  if (isLoading) return <Skeleton className="h-80 w-full rounded-md" />;
  if (isError) return <ErrorComponent message={error.message} />;

  if (!isError && !isLoading)
    return (
      <Card className="border-border bg-background/50  backdrop-blur-lg  max-h-125 overflow-scroll scrollbar-hide">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Users</CardTitle>
          <CardDescription className="text-muted-foreground">
            Latest user registrations and their activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Plan</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  AI Credits
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Resumes
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Joined
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {recentUsers?.map((user) => (
                <UserTableRow
                  key={user?.id}
                  id={user?.id}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  email={user?.email}
                  plan={user.subscription.plan.name}
                  status={user.subscription.status}
                  aiCreditsThisMonth={user.aiCreditsThisMonth}
                  aiCreditsTotal={user.subscription.plan.aiCreditsPerMonth}
                  totalResumes={user.subscription.plan.totalResumes}
                  resumes={user.resumes.length}
                  createdAt={user.createdAt}
                />
              ))}
            </TableBody>
          </Table>
          <InfiniteLoader
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </CardContent>
      </Card>
    );
}
