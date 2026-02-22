import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionsSkeleton() {
  return (
    <div className=" flex flex-col items-center justify-between gap-6 h-75">
      <Skeleton className="size-50 sm:size-60 flex items-center justify-center rounded-full" />

      <div className="flex w-full gap-5">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
