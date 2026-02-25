import { Skeleton } from "@/components/ui/skeleton";

export default function TotalsSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-38 w-full  rounded-lg" />
      ))}
    </>
  );
}
