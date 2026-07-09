import { reconcileUserPaymentService } from "@/lib/services/payment/reconcileUserPayment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseReconcileUserActionProps {
  userId: string;
}

export default function useReconcileUserAction({
  userId,
}: UseReconcileUserActionProps) {
  const { mutate: reconcile, isPending } = useMutation({
    mutationFn: async () => await reconcileUserPaymentService(userId),
    onSuccess: (res) => {
      toast.success(res.message || "Reconciled successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    reconcile,
    isPending,
  };
}
