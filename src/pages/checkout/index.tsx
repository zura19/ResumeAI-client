import ProcessingView from "./modules/ProcessingView";
import SuccessView from "./modules/SuccessView";
import FailedView from "./modules/FailedView";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import { useCheckoutStatusData } from "./hooks/useCheckoutStatusData";

export default function Checkout() {
  const {
    checkoutData,
    isLoading: loading,
    isError,
    refetch,
    isRefetching,
    showSuccess,
    continueToProfile,
    goHome,
  } = useCheckoutStatusData();

  const isProcessing = loading || isRefetching;
  const shouldShowSuccess =
    !isProcessing && !isError && showSuccess && !!checkoutData;
  const shouldShowFailed = !isProcessing && !isError && !shouldShowSuccess;

  return (
    <div className="w-full h-dvh flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isProcessing && <ProcessingView />}

      {!isProcessing && isError && (
        <ErrorComponent
          title={"Something went wrong"}
          message={`This Dose not mean your payment was not successful, it is our server problem. `}
        />
      )}

      {shouldShowSuccess && checkoutData && (
        <SuccessView
          createdAt={checkoutData.created + ""}
          last4={checkoutData.last4 as string}
          email={(checkoutData.email as string) || "-"}
          total={checkoutData.total}
          continueClick={continueToProfile}
        />
      )}

      {shouldShowFailed && <FailedView onReset={refetch} goHome={goHome} />}
    </div>
  );
}
