import { updateDefaultPlansService } from "@/lib/services/plan/updateDefaultPlans";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateDefaultPlansAction() {
  const queryClient = useQueryClient();

  const { mutate: updateDefaultPlans, isPending } = useMutation({
    mutationFn: updateDefaultPlansService,
    onSuccess: async (data) => {
      toast.success(data.message || "Default plans updated successfully");
      await queryClient.refetchQueries({
        queryKey: ["plans"],
        type: "active",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update default plans");
    },
  });

  return {
    updateDefaultPlans,
    isUpdatingDefaultPlans: isPending,
  };
}
