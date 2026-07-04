import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TotalsSkeleton from "./components/Skeleton";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import SpotlightCard from "@/components/shared/SpotlightCard";
import useAdminStatsData from "@/pages/admin/hooks/useAdminStatsData";

export function StatCards() {
  const { statItems, isLoading, isError, error, refetch } =
    useAdminStatsData();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {isLoading && <TotalsSkeleton />}
      {isError && (
        <ErrorComponent
          onRetry={refetch}
          message={(error as Error).message || "Failed to load stats."}
        />
      )}
      {!isLoading &&
        !isError &&
        statItems.map((item) => (
          <SpotlightCard
            key={item.title}
            cardClassName="border-border bg-background/50 backdrop-blur-lg group"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-indigo-300 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {item.value}
              </div>
              {item?.change !== null && (
                <p className="mt-1 text-xs text-primary">
                  {item.change > 0
                    ? `+${item.change.toFixed(1)}%`
                    : `${item.change.toFixed(1)}%`}{" "}
                  from last month
                </p>
              )}
            </CardContent>
          </SpotlightCard>
        ))}
    </div>
  );
}
