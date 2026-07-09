import ProcessingView from "./modules/ProcessingView";
import SuccessView from "./modules/SuccessView";
import FailedView from "./modules/FailedView";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import { useCheckoutStatusData } from "./hooks/useCheckoutStatusData";

export default function Checkout() {
  const {
    checkoutData,
    isError,
    errorMessage,
    refetch,
    showFailed,
    showProcessing,
    showSuccess,
    showTimeout,
    continueToProfile,
    goHome,
  } = useCheckoutStatusData();

  const shouldShowSuccess =
    !showProcessing && !isError && showSuccess && !!checkoutData;
  const shouldShowFailed =
    !showProcessing && !isError && (showFailed || showTimeout);

  return (
    <div className="w-full h-dvh flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {showProcessing && <ProcessingView />}

      {!showProcessing && isError && (
        <ErrorComponent
          title={"Something went wrong"}
          message={errorMessage}
          onRetry={refetch}
        />
      )}

      {shouldShowSuccess && checkoutData && (
        <SuccessView
          createdAt={checkoutData.created}
          currency={checkoutData.currency}
          last4={checkoutData.last4}
          email={checkoutData.email ?? null}
          total={checkoutData.total}
          continueClick={continueToProfile}
        />
      )}

      {shouldShowFailed && (
        <FailedView
          onReset={refetch}
          goHome={goHome}
          error={
            showTimeout
              ? "Payment is still finalizing. Please try again in a moment or check your profile for the latest subscription status."
              : "The payment could not be completed. Please try again or use a different payment method."
          }
        />
      )}
    </div>
  );
}
