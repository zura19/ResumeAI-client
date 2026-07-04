import SpotlightCard from "@/components/shared/SpotlightCard";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface props {
  feature: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
}

export default function FeatureCard({ feature }: props) {
  const Icon = feature.icon;
  return (
    <SpotlightCard key={feature.title}>
      <CardHeader className="relative z-10 bg-in">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/10">
          <Icon className="h-6 w-6 text-indigo-500 group-hover:text-indigo-300 transition-all duration-500" />
        </div>
        <CardTitle className="text-xl">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-base leading-relaxed">
          {feature.description}
        </CardDescription>
      </CardContent>
    </SpotlightCard>
  );
}
