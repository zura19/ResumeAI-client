import type { Plan } from "@/constants/plans/plans";
import { Sparkles } from "lucide-react";
interface props {
  plan: Plan;
}

export default function Header({ plan }: props) {
  return (
    <div className="mb-8 flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            {plan.name} Plan
          </h1>
          {plan.recommended && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              <Sparkles className="h-3 w-3" />
              Most Popular
            </span>
          )}
        </div>
        <p className="text-lg text-muted-foreground">{plan.description}</p>
      </div>

      <div className="text-left md:text-right">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-foreground">
            ${plan.price}
          </span>
          <span className="text-muted-foreground">{plan.period}</span>
        </div>
        {plan.price > 0 && (
          <p className="mt-1 text-sm text-muted-foreground">Billed monthly</p>
        )}
      </div>
    </div>
  );
}
