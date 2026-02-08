import { CheckIcon } from "lucide-react";

interface props {
  features: string[];
}

export default function Features({ features }: props) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Included Features
      </span>
      <div className="grid gap-1.5">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
