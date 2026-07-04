import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import Wrapper from "@/components/shared/Wrapper";
import Contact from "./components/Contact";
import Header from "./components/Header";
import AdditionalFeatures from "./components/AdditionalFeatures";
import FormButton from "@/components/shared/FormButton";
import { Spinner } from "@/components/ui/spinner";
import useDetailedPlanData from "./hooks/useDetailedPlanData";
import usePlanCheckoutAction from "./hooks/actions/usePlanCheckoutAction";

export default function PlanDetails() {
  const { plan, isLoading, isError, error } = useDetailedPlanData();
  const { user, isCreating, isCanceling, handlePlanAction } =
    usePlanCheckoutAction({
      planName: plan?.name,
    });

  if (isError)
    return (
      <div className="h-dvh flex items-center justify-center">
        <ErrorComponent
          title="Something went wrong"
          message={
            error?.message || "Something went wrong. Please try again later."
          }
        />
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

            <AdditionalFeatures plan={plan} />

            <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {plan.priceMonthly === 0
                    ? "No credit card required"
                    : "Cancel anytime. No hidden fees."}
                </p>
              </div>

              <FormButton
                type="button"
                disabled={isCreating || plan.name === user?.plan || isCanceling}
                onClick={handlePlanAction}
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
