import { useQuery } from "@tanstack/react-query";
import CancelView from "../checkout/modules/CancelView";
import ProcessingView from "../checkout/modules/ProcessingView";
import { cancelStatusService } from "@/lib/services/checkout/cancelStatus";
import FailedView from "../checkout/modules/FailedView";
import { useEffect } from "react";
import { useUser } from "@/lib/store/userState";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["cancel-status"],
    queryFn: async () => await cancelStatusService(),
    refetchOnWindowFocus: false,
  });

  function renderView() {
    if (isLoading || isRefetching) return <ProcessingView session="cancel" />;
    // if (isError) return <FailedView />;
    if (!isLoading && !isError && !isRefetching && data?.data.allowCancel)
      return <CancelView continueClick={() => navigate("/profile")} />;
    return (
      <FailedView
        goHome={() => navigate("/")}
        onReset={refetch}
        session="cancel"
      />
    );
  }

  useEffect(() => {
    if (data?.data.allowCancel) {
      setUser({
        id: data.data.user.id,
        firstName: data.data.user.firstName,
        lastName: data.data.user.lastName,
        email: data.data.user.email,
        plan: data.data.user.plan,
        role: data.data.user.role,
      });
    }
  }, [data, setUser]);

  return (
    <div className="w-full h-dvh flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {renderView()}
    </div>
  );
}
