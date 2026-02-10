import { cn, uppercaseFirstLetter } from "@/lib/utils";
import { Badge } from "../ui/badge";
import type { PlanName } from "@/lib/types/plan";

interface props {
  plan: PlanName;
  className?: string;
}

export default function UserPlanBadge({ plan, className }: props) {
  const defaultClass = `font-semibold tracking-wider text-chart-2 text-sm  px-4 `;

  const classes: Record<PlanName, string> = {
    free: "bg-primary/20 text-primary border-primary/25 hover:bg-primary/20",
    pro: "bg-chart-2/10 text-chart-2 border-chart-2/25 hover:bg-chart-2/20",
    enterprise:
      "bg-chart-3/10 text-chart-3 border-chart-3/25 hover:bg-chart-3/20",
  };
  return (
    <Badge className={cn(defaultClass, classes[plan], className)}>
      {uppercaseFirstLetter(plan)}
    </Badge>
  );
}
