import { Button } from "@/components/ui/button";
import type { PlanName } from "@/lib/types/plan";
import { CreditCardIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface props {
  planName?: PlanName;
}

export default function Actions({ planName }: props) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        className="gap-2 border-border text-muted-foreground hover:text-foreground hover:bg-secondary bg-transparent"
      >
        <CreditCardIcon className="h-4 w-4" />
        Manage Billing
      </Button>
      <Button
        size="sm"
        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        asChild
      >
        <Link to="/plans">
          <ZapIcon className="h-4 w-4" />
          {planName && planName === "enterprise"
            ? "Change Plan"
            : "Upgrade Plan"}
        </Link>
      </Button>
    </div>
  );
}
