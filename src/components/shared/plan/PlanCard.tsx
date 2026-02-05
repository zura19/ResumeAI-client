import { Check } from "lucide-react";
import { cn, formatCurrency, uppercaseFirstLetter } from "@/lib/utils";
import { Link } from "react-router-dom";
// import type { Plan } from "@/constants/plans/p/lans";
import SpotlightCard from "../SpotlightCard";
import { CardContent } from "../../ui/card";
import type { Plan } from "@/lib/types/plan";

interface props {
  plan: Plan;
}

export function PlanCard({ plan }: props) {
  const recommendedPlan = plan.recommended;

  function getBtnText() {
    switch (plan.name) {
      case "free":
        return "Get Started";
      case "pro":
        return "Upgrade to Pro";
      case "enterprise":
        return "Upgrade to Enterprise";
    }
  }

  return (
    <div className="relative h-full w-full rounded-xl flex group ">
      <SpotlightCard
        cardClassName={cn(
          "relative flex shadow-[0_8px_30px_rgb(0,0,0,0.0)] w-full transition-all duration-300",
          "hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1",
          recommendedPlan && "shadow-[0px_0px_5px_2px_#625fff]",
        )}
      >
        <Link to={`/plans/${plan.name}`} className="block group h-full">
          <CardContent className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {uppercaseFirstLetter(plan.name)}
              </h3>
            </div>

            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground bg-indigo-">
                {formatCurrency(plan.priceMonthly / 100)}
              </span>
              <span className="text-muted-foreground"> /month</span>
            </div>

            <p className="mb-6 text-sm text-muted-foreground">
              {plan.description}
            </p>

            <ul className="mb-8 flex-1 space-y-3 h-full">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      recommendedPlan
                        ? "text-chart-2"
                        : "text-muted-foreground",
                    )}
                  />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "w-full rounded-lg py-3 mt-auto text-center text-sm font-medium transition-colors",
                recommendedPlan
                  ? "bg-indigo-500 text-primary group-hover:bg-indigo-600"
                  : "border border-border bg-transparent text-foreground group-hover:bg-secondary",
              )}
            >
              {getBtnText()}
            </div>
          </CardContent>
        </Link>
      </SpotlightCard>
      {recommendedPlan && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 group-hover:-translate-y-1 transition-all duration-300">
          <div className="rounded-full flex gap-2 items-center bg-indigo-500 backdrop-blur-md px-4 py-1 text-xs font-medium text-primary-foreground">
            <span className="font-semibold text-primary">Recommended</span>
          </div>
        </div>
      )}
    </div>
  );
}
