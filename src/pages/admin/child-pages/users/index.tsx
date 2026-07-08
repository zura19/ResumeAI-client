import { ErrorComponent } from "@/components/shared/ErrorComponents";
import InfiniteLoader from "@/components/shared/InfiniteLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Users } from "lucide-react";
import { useState } from "react";
import UserRow from "./components/UserRow";
import useAdminUsersData from "./hooks/useAdminUsersData";

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const {
    users,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminUsersData({ search });

  return (
    <Card className="border-border bg-background/50 backdrop-blur-lg">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="size-5" />
            Users
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Search users and reconcile payment state.
          </CardDescription>
        </div>

        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email"
            className="pl-9"
          />
        </div>
      </CardHeader>

      <CardContent>
        {isLoading && <Skeleton className="h-100 w-full rounded-md" />}

        {isError && (
          <ErrorComponent
            message={error?.message || "Unable to load users."}
          />
        )}

        {!isLoading && !isError && (
          <>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">
                    Created
                  </TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>

            {users.length === 0 && (
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                No users found.
              </div>
            )}

            {users.length > 0 && (
              <InfiniteLoader
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
