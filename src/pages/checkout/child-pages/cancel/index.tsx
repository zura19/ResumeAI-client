import CancelView from "../../modules/CancelView";
import ProcessingView from "../../modules/ProcessingView";
import FailedView from "../../modules/FailedView";
import { useCancelStatusData } from "../../hooks/useCancelStatusData";

export default function Cancel() {
  const {
    isLoading,
    isError,
    refetch,
    isRefetching,
    allowCancel,
    continueToProfile,
    goHome,
  } = useCancelStatusData();

  const isProcessing = isLoading || isRefetching;
  const shouldShowSuccess = !isProcessing && !isError && allowCancel;
  const shouldShowFailed = !isProcessing && !shouldShowSuccess;

  return (
    <div className="w-full h-dvh flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isProcessing && <ProcessingView session="cancel" />}

      {shouldShowSuccess && <CancelView continueClick={continueToProfile} />}

      {shouldShowFailed && (
        <FailedView goHome={goHome} onReset={refetch} session="cancel" />
      )}
    </div>
  );
}
