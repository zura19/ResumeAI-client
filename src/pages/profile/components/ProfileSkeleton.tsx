import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    // User
    <div className="space-y-12">
      <Card className="border-0 bg-background/70 backdrop-blur-lg">
        <CardContent className="flex flex-col justify-center gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex  gap-6  items-center">
            <Skeleton className="size-20 sm:size-24 rounded-full " />

            <div className="flex-1 space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 md:w-60" />
              ))}
              {/* <Skeleton className="h-4 sm:w-60" /> */}
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-8 md:w-32" />
            <Skeleton className="h-8 md:w-32" />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-34 w-full" />
        ))}
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-50" />
        <Skeleton className="h-100 w-full" />
      </div>
    </div>
  );
}
