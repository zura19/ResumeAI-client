import { cn } from "@/lib/utils";
import type { Plan } from "@/lib/types/plan";
import { Check } from "lucide-react";

interface AdditionalFeaturesProps {
  plan: Plan;
}

export default function AdditionalFeatures({
  plan,
}: AdditionalFeaturesProps) {
  return (
    <div className="mb-10">
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        {"What's included"}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {plan.additionalFeatures.map((feature, index) => (
          <div
            key={`${plan.id}-additional-feature-${index}-${feature}`}
            className="flex items-start gap-3"
          >
            <div
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                plan.recommended ? "bg-primary/20" : "bg-secondary",
              )}
            >
              <Check
                className={cn(
                  "h-3 w-3",
                  plan.recommended ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
