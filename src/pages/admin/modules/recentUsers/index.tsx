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
import { recentUsers } from "../../admin-data";
import UserTableRow from "./components/Row";

export function RecentUsersTable() {
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
            {[...recentUsers, ...recentUsers, ...recentUsers].map((user) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
