import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { monthlyRevenueUsersService } from "@/lib/services/admin/monthlyRevenueUsersService";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import SelectYear from "./components/SelectYear";
import Chart from "./components/Chart";

// prettier-ignore
const months = [ "Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];

export default function RevenueChart() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["monthlyRevenueUsers", year],
    queryFn: async () => await monthlyRevenueUsersService(year),
  });

  const formattedData = useMemo(() => {
    function formatMonth(lastTwoDigits: string) {
      const monthIndex = parseInt(lastTwoDigits, 10) - 1;
      return months[monthIndex] || lastTwoDigits;
    }

    return (
      data?.data.map((d) => ({
        ...d,
        month: formatMonth(d.month.slice(-2)),
        revenue: d.revenue / 100,
      })) || []
    );
  }, [data]);

  if (isError) {
    return (
      <ErrorComponent
        title={"Something went wrong"}
        message={
          error.message || "Unable to load revenue and user growth data."
        }
        onRetry={refetch}
      />
    );
  }

  console.log("Formatted Data:", formattedData);

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
