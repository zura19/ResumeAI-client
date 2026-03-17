import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {[...Array(10)].map((_, i) => (
        <div
          className={`flex gap-4 ${i % 2 === 0 ? "flex-row-reverse" : ""}`}
          key={i}
        >
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-8 max-w-[80%] w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
