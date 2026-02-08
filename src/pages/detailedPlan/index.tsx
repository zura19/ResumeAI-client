import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import Wrapper from "@/components/shared/Wrapper";
import Contact from "./components/Contact";
import Header from "./components/Header";
import FormButton from "@/components/shared/FormButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlansByNameService } from "@/lib/services/plan/getPlanByName";
import type { PlanName } from "@/lib/types/plan";
import { Spinner } from "@/components/ui/spinner";
import { createCheckoutService } from "@/lib/services/checkout/createCheckout";
import { toast } from "sonner";

export default function PlanDetails() {
  const params = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["plan", params.id],
    queryFn: () => getPlansByNameService(params.id as PlanName),
    staleTime: 3 * 60 * 60 * 1000, // 3 hour
    enabled: !!params.id,
  });

  const plan = data?.data;

  const { mutate: createCheckout, isPending: isCreating } = useMutation({
    mutationFn: async () => await createCheckoutService(plan?.name as PlanName),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Redirecting to checkout...");
      // go to another webpage url:
      window.location.href = data.data.sessionUrl;
      // window = data.data.sessionUrl;
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  if (isError)
    return (
      <div className="h-dvh flex items-center justify-center">
        <ErrorComponent title="Something went wrong" message={error?.message} />
      </div>
    );

  if (isLoading)
    return (
      <Wrapper className="h-dvh flex items-center justify-center bg-background/40 backdrop-blur-md max-w-full">
        <Spinner className="size-7 text-primary animate-spin" />
      </Wrapper>
    );

  if (!isLoading && !isError && plan)
    return (
      <div className="h-dvh overflow-y-scroll scrollbar-hide">
        <Wrapper className="">
          <Link
            to="/plans"
            className=" mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all plans
          </Link>

          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-8 md:p-12">
            <Header plan={plan} />

            <div className="mb-10">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                About this plan
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {plan.detailedDescription}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                {"What's included"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {plan.additionalFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.recommended ? "bg-primary/20" : "bg-secondary",
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3 w-3",
                          plan.recommended
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {plan.priceMonthly === 0
                    ? "No credit card required"
                    : "Cancel anytime. No hidden fees."}
                </p>
              </div>

              <FormButton
                disabled={isCreating}
                onClick={createCheckout}
                loading={isCreating}
                loadingText="Creating Checkout..."
                className={cn(
                  "inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-medium transition-colors",
                  plan.recommended
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border bg-transparent text-foreground hover:bg-secondary",
                )}
              >
                {plan.priceMonthly === 0
                  ? "Cancel Subscription"
                  : `Continue with ${plan.name}`}
              </FormButton>
            </div>
          </div>

          {plan.priceMonthly > 0 && <Contact />}
        </Wrapper>
      </div>
    );
}
