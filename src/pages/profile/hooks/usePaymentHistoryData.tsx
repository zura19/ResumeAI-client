import { getUserPaymentsService } from "@/lib/services/payment/getUserPayments";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function usePaymentHistoryData() {
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["payment-history", showAll],
    queryFn: async () => await getUserPaymentsService(showAll ? 100 : 5),
    staleTime: 1 * 60 * 60 * 1000,
  });

  const payments = data?.data;

  function toggleShowAll() {
    setShowAll((prev) => !prev);
  }

  return {
    showAll,
    payments,
    isLoading,
    error,
    refetch,
    toggleShowAll,
  };
}
