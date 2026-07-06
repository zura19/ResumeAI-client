import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/store/userState";
import { cancelStatusService } from "@/lib/services/checkout/cancelStatus";

export function useCancelStatusData() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const query = useQuery({
    queryKey: ["cancel-status"],
    queryFn: async () => await cancelStatusService(),
    refetchOnWindowFocus: false,
  });

  const allowCancel = !!query.data?.data.allowCancel;
  const user = query.data?.data.user;

  useEffect(() => {
    if (allowCancel && user) {
      setUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        plan: user.plan,
        role: user.role,
      });
    }
  }, [allowCancel, setUser, user]);

  return {
    ...query,
    allowCancel,
    continueToProfile: () => navigate("/profile"),
    goHome: () => navigate("/"),
  };
}
