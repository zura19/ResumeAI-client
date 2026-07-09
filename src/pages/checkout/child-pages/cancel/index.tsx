import CancelView from "../../modules/CancelView";
import ProcessingView from "../../modules/ProcessingView";
import FailedView from "../../modules/FailedView";
import { useCancelStatusData } from "../../hooks/useCancelStatusData";

export default function Cancel() {
  const {
    isError,
    errorMessage,
    refetch,
    isCanceled,
    showProcessing,
    showTimeout,
    continueToProfile,
    goHome,
  } = useCancelStatusData();

  const shouldShowSuccess = !showProcessing && !isError && isCanceled;
  const shouldShowFailed =
    !showProcessing && !isError && !shouldShowSuccess && showTimeout;

  return (
    <div className="w-full h-dvh flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {showProcessing && <ProcessingView session="cancel" />}

      {shouldShowSuccess && <CancelView continueClick={continueToProfile} />}

      {!showProcessing && isError && (
        <FailedView
          goHome={goHome}
          onReset={refetch}
          session="cancel"
          error={errorMessage}
        />
      )}

      {shouldShowFailed && (
        <FailedView
          goHome={goHome}
          onReset={refetch}
          session="cancel"
          error="Cancellation is still finalizing. Please try again in a moment or check your profile for the latest subscription status."
        />
      )}
    </div>
  );
}
