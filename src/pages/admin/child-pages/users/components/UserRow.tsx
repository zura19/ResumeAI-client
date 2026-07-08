import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import type { AdminSearchUser } from "@/lib/services/admin/searchUsersService";
import { formatDate } from "date-fns";
import { RefreshCw } from "lucide-react";
import { getInitials } from "../helpers/getInitials";
import useReconcileUserAction from "../hooks/actions/useReconcileUserAction";

interface UserRowProps {
  user: AdminSearchUser;
}

export default function UserRow({ user }: UserRowProps) {
  const { reconcile, isPending } = useReconcileUserAction({ userId: user.id });

  return (
    <TableRow className="border-border">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="bg-secondary text-foreground text-xs">
              {getInitials(user.firstName, user.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-medium text-foreground">
              {user.firstName} {user.lastName}
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              {user.id}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{user.email}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(user.createdAt, "dd MMM yyyy")}
      </TableCell>
      <TableCell className="text-right">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={() => reconcile()}
          className="min-w-28"
        >
          {isPending ? (
            <Spinner className="size-4" />
          ) : (
            <RefreshCw className="size-4" />
          )}
          Reconcile
        </Button>
      </TableCell>
    </TableRow>
  );
}
