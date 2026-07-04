import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import SelectYear from "./components/SelectYear";
import Chart from "./components/Chart";
import useAdminRevenueChartData from "@/pages/admin/hooks/useAdminRevenueChartData";

export default function RevenueChart() {
  const { year, setYear, formattedData, isLoading, isError, error, refetch } =
    useAdminRevenueChartData();

  if (isError) {
    return (
      <ErrorComponent
        title={"Something went wrong"}
        message={
          error?.message || "Unable to load revenue and user growth data."
        }
        onRetry={refetch}
      />
    );
  }

  return (
    <Card className="border-border bg-background/50  backdrop-blur-lg">
      <CardHeader className="flex justify-between items-start">
        <div className="space-y-1">
          <CardTitle className="text-foreground">
            Revenue & User Growth
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Monthly revenue and user acquisition over the year of {year}.
          </CardDescription>
        </div>
        <SelectYear year={year} setYear={setYear} />
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="h-75 w-full">
            <Skeleton className="h-full w-full" />
          </div>
        )}

        {!isLoading && <Chart formattedData={formattedData} />}
      </CardContent>
    </Card>
  );
}
