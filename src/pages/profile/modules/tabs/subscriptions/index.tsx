import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import Actions from "./components/Actions";
import Features from "./components/Features";
import NextPayment from "./components/NextPayment";
import Header from "./components/Header";
import UsageStats from "./components/UsageStats";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import useSubscriptionsData from "@/pages/profile/hooks/useSubscriptionsData";

interface props {
  totalResumes: number;
}

export function SubscriptionCardTab({ totalResumes }: props) {
  const { user, subscription, userActions, plan, isLoading, error } =
    useSubscriptionsData();

  if (error)
    return (
      <ErrorComponent
        className="max-w-full min-h-100 bg-background/50 backdrop-blur-lg"
        title="Something went wrong"
        message={error.message}
      />
    );

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
            {user?.plan !== "free" && (
              <NextPayment
                currentPeriodStart={subscription?.currentPeriodStart}
                currentPeriodEnd={subscription?.currentPeriodEnd}
              />
            )}
            <UsageStats
              userActions={{
                totalResumes,
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
