import { useNavigate, useSearchParams } from "react-router-dom";
import ProcessingView from "./modules/ProcessingView";
import SuccessView from "./modules/SuccessView";
import FailedView from "./modules/FailedView";
import { useQuery } from "@tanstack/react-query";
import { checkStatusService } from "@/lib/services/checkout/checkStatus";
import { ErrorComponent } from "@/components/shared/ErrorComponents";

export default function Checkout() {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const navigate = useNavigate();

  const {
    data,
    isLoading: loading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => await checkStatusService(sessionId || ""),
    enabled: !!sessionId,
  });

  console.log(data);

  const showSuccess = data?.data.status === "paid" && data?.data.isProcessed;

  // function goToProfile() {
  //   navigate("/profile");
  // }

  function goTo(path: string) {
    navigate(path);
  }

  function renderContent() {
    if (loading || isRefetching) return <ProcessingView />;
    if (isError)
      return (
        <ErrorComponent
          title={"Something went wrong"}
          message={`This Dose not mean your payment was not successful, it is our server problem. `}
        />
      );

    if (!loading && showSuccess)
      return (
        <SuccessView
          createdAt={data?.data?.created + ""}
          last4={data?.data.last4 as string}
          email={(data?.data?.email as string) || "-"}
          total={data.data.total}
          continueClick={() => goTo("/profile")}
        />
      );
    if (!loading && !showSuccess)
      return (
        <FailedView
          onReset={refetch}
          goHome={() => goTo("/")}
          // goToProfile();
        />
      );
  }

  return (
    <div className="w-full h-dvh flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {renderContent()}
    </div>
  );
}
