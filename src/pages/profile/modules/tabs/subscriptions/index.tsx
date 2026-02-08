import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { getSubscriptionDataService } from "@/lib/services/subscription/getSubscriptionData";
import { useQuery } from "@tanstack/react-query";
import Actions from "./components/Actions";
import Features from "./components/features";
import NextPayment from "./components/NextPayment";
import Header from "./components/Header";
import UsageStats from "./components/UsageStats";
import { ErrorComponent } from "@/components/shared/ErrorComponents";

export function SubscriptionCardTab() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => await getSubscriptionDataService(),
    staleTime: 1 * 60 * 60 * 1000, // 1 hour
  });

  const { subscription, userActions } = data?.data || {};
  const { plan } = subscription || {};

  if (error)
    return (
      <ErrorComponent
        className="max-w-full min-h-100 bg-background/50 backdrop-blur-lg"
        title="Something went wrong"
        message={error.message}
      />
    );

  console.log(data);

  return (
    <Card className="border-border bg-background/50 backdrop-blur-lg min-h-100">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner className="text-primary flexi items-center justify-center size-6 animate-spin" />
        </div>
      )}
      {!isLoading && (
        <>
          <Header name={plan?.name} priceMonthly={plan?.priceMonthly} />
          <CardContent className="flex flex-col gap-6">
            <NextPayment
              currentPeriodStart={subscription?.currentPeriodStart}
              currentPeriodEnd={subscription?.currentPeriodEnd}
            />
            <UsageStats
              userActions={{
                generatedResumesThisMonth:
                  userActions?.generatedResumesThisMonth || 0,
                aiCreditsThisMonth: userActions?.aiCreditsThisMonth || 0,
              }}
              plan={{
                aiCreditsPerMonth: plan?.aiCreditsPerMonth || 0,
                totalResumes: plan?.totalResumes || 0,
              }}
            />
            <Features features={plan?.features || []} />
            <Actions planName={plan?.name} />
          </CardContent>
        </>
      )}
    </Card>
  );
}
