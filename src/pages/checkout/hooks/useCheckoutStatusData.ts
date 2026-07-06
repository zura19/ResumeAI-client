import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@/lib/store/userState";
import { checkStatusService } from "@/lib/services/checkout/checkStatus";

export function useCheckoutStatusData() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const sessionId = searchParams.get("session_id");

  const query = useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => await checkStatusService(sessionId || ""),
    enabled: !!sessionId,
    refetchOnWindowFocus: false,
  });

  const showSuccess =
    query.data?.data.status === "paid" && query.data?.data.isProcessed;
  const checkoutData = query.data?.data;
  const user = query.data?.data.user;

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
    showSuccess,
    continueToProfile: () => navigate("/profile"),
    goHome: () => navigate("/"),
  };
}
