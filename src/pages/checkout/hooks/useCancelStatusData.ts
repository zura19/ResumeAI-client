import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/store/userState";
import { cancelStatusService } from "@/lib/services/checkout/cancelStatus";

const POLLING_INTERVAL_MS = 2500;
const POLLING_TIMEOUT_MS = 30000;

export function useCancelStatusData() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [hasTimedOut, setHasTimedOut] = useState(false);

  const query = useQuery({
    queryKey: ["cancel-status"],
    queryFn: async () => await cancelStatusService(),
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: (pollQuery) => {
      if (
        hasTimedOut ||
        pollQuery.state.error ||
        pollQuery.state.data?.data.isCanceled
      ) {
        return false;
      }

      return POLLING_INTERVAL_MS;
    },
  });

  const isCanceled = !!query.data?.data.isCanceled;
  const user = query.data?.data.user;
  const showTimeout = hasTimedOut && !isCanceled;
  const showProcessing =
    query.isLoading || (!query.isError && !showTimeout && !isCanceled);
  const errorMessage =
    query.error instanceof Error
      ? query.error.message
      : "Failed to check cancellation status";

  useEffect(() => {
    if (hasTimedOut || query.isError || isCanceled) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHasTimedOut(true);
    }, POLLING_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [hasTimedOut, isCanceled, query.isError]);

  useEffect(() => {
    if (isCanceled && user) {
      setUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        plan: user.plan,
        role: user.role,
      });
    }
  }, [isCanceled, setUser, user]);

  return {
    ...query,
    errorMessage,
    isCanceled,
    showProcessing,
    showTimeout,
    refetch: () => {
      setHasTimedOut(false);
      return query.refetch();
    },
    continueToProfile: () => navigate("/profile"),
    goHome: () => navigate("/"),
  };
}
