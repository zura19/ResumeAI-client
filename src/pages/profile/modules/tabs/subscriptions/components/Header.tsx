import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, uppercaseFirstLetter } from "@/lib/utils";
import { CrownIcon } from "lucide-react";

interface props {
  name?: string;
  priceMonthly?: number;
}

export default function Header({ name, priceMonthly }: props) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30 ">
            <CrownIcon className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <CardTitle className="text-lg text-foreground">
              {uppercaseFirstLetter(name || "")} Plan
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {formatCurrency(Number(priceMonthly) / 100 || 0)}
              /Month
            </CardDescription>
          </div>
        </div>
        <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/25 text-sm tracking-wider hover:bg-chart-2/20">
          Active
        </Badge>
      </div>
    </CardHeader>
  );
}
