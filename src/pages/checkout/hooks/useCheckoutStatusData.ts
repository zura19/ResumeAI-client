import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@/lib/store/userState";
import {
  CheckoutStatusError,
  checkStatusService,
} from "@/lib/services/checkout/checkStatus";

const POLLING_INTERVAL_MS = 2500;
const POLLING_TIMEOUT_MS = 30000;

export function useCheckoutStatusData() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const sessionId = searchParams.get("session_id");
  const [hasTimedOut, setHasTimedOut] = useState(false);

  const query = useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => await checkStatusService(sessionId || ""),
    enabled: !!sessionId,
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: (pollQuery) => {
      const statusData = pollQuery.state.data?.data;
      const paymentStatus = statusData?.paymentStatus;
      const hasFailed =
        paymentStatus === "FAILED" ||
        (statusData?.status === "unpaid" && paymentStatus !== "PROCESSING");

      if (
        hasTimedOut ||
        pollQuery.state.error ||
        statusData?.isProcessed ||
        hasFailed
      ) {
        return false;
      }

      return POLLING_INTERVAL_MS;
    },
  });

  const checkoutData = query.data?.data;
  const paymentStatus = checkoutData?.paymentStatus;
  const user = checkoutData?.user;
  const showMissingSession = !sessionId;
  const showSuccess = !!checkoutData?.isProcessed;
  const showFailed =
    showMissingSession ||
    paymentStatus === "FAILED" ||
    (checkoutData?.status === "unpaid" && paymentStatus !== "PROCESSING");
  const isForbidden =
    query.error instanceof CheckoutStatusError && query.error.status === 403;
  const showTimeout = hasTimedOut && !showSuccess && !showFailed;
  const showProcessing =
    !!sessionId &&
    (query.isLoading ||
      (!query.isError && !showSuccess && !showFailed && !showTimeout));
  const errorMessage = isForbidden
    ? "This checkout session does not belong to your account. Please start checkout again."
    : query.error instanceof Error
      ? query.error.message
      : "Failed to check payment status";

  useEffect(() => {
    setHasTimedOut(false);
  }, [sessionId]);

  useEffect(() => {
    if (
      !sessionId ||
      hasTimedOut ||
      query.isError ||
      showSuccess ||
      showFailed
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHasTimedOut(true);
    }, POLLING_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [hasTimedOut, query.isError, sessionId, showFailed, showSuccess]);

  useEffect(() => {
    if (showSuccess && user) {
      setUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        plan: user.plan,
        role: user.role,
      });
    }
  }, [showSuccess, setUser, user]);

  return {
    ...query,
    checkoutData,
    errorMessage,
    isForbidden,
    showFailed,
    showProcessing,
    showSuccess,
    showTimeout,
    refetch: () => {
      setHasTimedOut(false);
      return query.refetch();
    },
    continueToProfile: () => navigate("/profile"),
    goHome: () => navigate("/"),
  };
}
