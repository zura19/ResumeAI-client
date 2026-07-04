import { getSubscriptionDataService } from "@/lib/services/subscription/getSubscriptionData";
import { useUser } from "@/lib/store/userState";
import { useQuery } from "@tanstack/react-query";

export default function useSubscriptionsData() {
  const { user } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => await getSubscriptionDataService(),
    staleTime: 1 * 60 * 60 * 1000,
  });

  const { subscription, userActions } = data?.data || {};
  const { plan } = subscription || {};

  return {
    user,
    subscription,
    userActions,
    plan,
    isLoading,
    error,
  };
}
