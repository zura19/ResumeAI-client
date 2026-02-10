import { Skeleton } from "@/components/ui/skeleton";

export default function PlanSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-120 rounded-lg" />
      ))}
    </div>
  );
}
