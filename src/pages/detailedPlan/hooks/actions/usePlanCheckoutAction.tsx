import { createCheckoutService } from "@/lib/services/checkout/createCheckout";
import { cancleSubscriptionService } from "@/lib/services/payment/cancelSubscription";
import { useUser } from "@/lib/store/userState";
import type { PlanName } from "@/lib/types/plan";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UsePlanCheckoutActionProps {
  planName?: PlanName;
}

export default function usePlanCheckoutAction({
  planName,
}: UsePlanCheckoutActionProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  const { mutate: createCheckout, isPending: isCreating } = useMutation({
    mutationFn: async () => await createCheckoutService(planName as PlanName),
    onSuccess: (data) => {
      toast.success("Redirecting to checkout...");
      window.location.href = data.data.sessionUrl;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: cancelSubscription, isPending: isCanceling } = useMutation({
    mutationFn: async () => await cancleSubscriptionService(),
    onSuccess: () => {
      toast.success("Redirecting to cancel...");
      navigate("/cancel");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handlePlanAction() {
    if (planName !== "free" && user?.plan !== planName) {
      createCheckout();
    }

    if (planName === "free" && user?.plan !== "free") {
      cancelSubscription();
    }
  }

  return {
    user,
    isCreating,
    isCanceling,
    handlePlanAction,
  };
}
