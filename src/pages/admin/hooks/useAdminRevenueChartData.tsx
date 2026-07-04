import { monthlyRevenueUsersService } from "@/lib/services/admin/monthlyRevenueUsersService";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function useAdminRevenueChartData() {
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
      data?.data.map((item) => ({
        ...item,
        month: formatMonth(item.month.slice(-2)),
        revenue: item.revenue / 100,
      })) || []
    );
  }, [data]);

  return {
    year,
    setYear,
    formattedData,
    isLoading,
    isError,
    error,
    refetch,
  };
}
