import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "date-fns";

interface props {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  status: string;
  resumes: number;
  totalResumes: number;
  aiCreditsThisMonth: number;
  aiCreditsTotal: number;
  createdAt: string;
}

function getPlanBadgeClasses(plan: string) {
  switch (plan) {
    case "enterprise":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    case "pro":
      return "border-sky-500/30 bg-sky-500/10 text-sky-400";
    default:
      return "border-border bg-secondary text-muted-foreground";
  }
}

function getStatusBadgeClasses(status: string) {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    case "CANCELED":
      return "border-red-500/30 bg-red-500/10 text-red-400";
    case "PAST_DUE":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    default:
      return "border-border bg-secondary text-muted-foreground";
  }
}

export default function UserTableRow(u: props) {
  const {
    id,
    firstName,
    lastName,
    email,
    plan,
    status,
    aiCreditsThisMonth,
    aiCreditsTotal,
    totalResumes,
    resumes,
    createdAt,
  } = u;
  return (
    <TableRow key={id} className="border-border">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="bg-secondary text-foreground text-xs">
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground">
              {firstName} {lastName}
            </div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={getPlanBadgeClasses(plan)}>
          {plan}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={getStatusBadgeClasses(status)}>
          {status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell className="text-right font-mono text-sm text-foreground">
        {aiCreditsThisMonth}
        <span className="text-muted-foreground">/{aiCreditsTotal}</span>
      </TableCell>
      <TableCell className="text-right font-mono text-sm text-foreground">
        {resumes}
        <span className="text-muted-foreground">/{totalResumes}</span>
      </TableCell>
      <TableCell className="text-right text-sm text-muted-foreground">
        {formatDate(createdAt, "dd MMM yyyy")}
      </TableCell>
    </TableRow>
  );
}
