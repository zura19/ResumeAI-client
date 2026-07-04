import { getPlansByNameService } from "@/lib/services/plan/getPlanByName";
import { updatePlanservice } from "@/lib/services/plan/updatePlan";
import type { Plan, PlanName } from "@/lib/types/plan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export interface UpdatePlanFormState {
  description: string;
  price: number;
  features: string[];
  additionalFeatures: string[];
  detailedDescription: string;
  recommended: "true" | "false";
  stripeProductId: string;
  stripePriceId: string;
  aiCreditsPerMonth: number;
  totalResumes: number;
}

const initialFormState: UpdatePlanFormState = {
  description: "",
  price: 0,
  features: [],
  additionalFeatures: [],
  detailedDescription: "",
  recommended: "false",
  stripeProductId: "",
  stripePriceId: "",
  aiCreditsPerMonth: 0,
  totalResumes: 0,
};

export default function useUpdatePlanData() {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<UpdatePlanFormState>(initialFormState);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["plan", params.name],
    queryFn: () => getPlansByNameService(params.name as PlanName),
    enabled: !!params.name,
  });

  const plan = data?.data;

  useEffect(() => {
    if (!plan) {
      return;
    }

    const setter = () =>
      setForm({
        description: plan.description,
        price: plan.priceMonthly,
        features: plan.features,
        additionalFeatures: plan.additionalFeatures,
        detailedDescription: plan.detailedDescription,
        recommended: plan.recommended ? "true" : "false",
        stripeProductId: plan.stripeProductId,
        stripePriceId: plan.stripePriceId,
        aiCreditsPerMonth: plan.aiCreditsPerMonth,
        totalResumes: plan.totalResumes,
      });

    setter();
  }, [plan]);

  const { mutateAsync: updatePlan, isPending } = useMutation({
    mutationFn: (body: Partial<Plan>) =>
      updatePlanservice(plan?.id as string, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
      navigate("/admin/plans");
      toast.success("Plan updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update plan");
    },
  });

  function setField<K extends keyof UpdatePlanFormState>(
    key: K,
    value: UpdatePlanFormState[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submitUpdate() {
    const body = {
      name: plan?.name as PlanName,
      description: form.description,
      priceMonthly: form.price,
      features: form.features,
      additionalFeatures: form.additionalFeatures,
      detailedDescription: form.detailedDescription,
      recommended: form.recommended === "true",
      stripeProductId: form.stripeProductId,
      stripePriceId: form.stripePriceId,
      aiCreditsPerMonth: form.aiCreditsPerMonth,
      totalResumes: form.totalResumes,
    };

    await updatePlan(body);
  }

  return {
    plan,
    form,
    isLoading,
    isError,
    error,
    isPending,
    setField,
    submitUpdate,
  };
}
