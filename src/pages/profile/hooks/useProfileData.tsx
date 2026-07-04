import { getProfileDataService } from "@/lib/services/user/profileDataService";
import { useUser } from "@/lib/store/userState";
import { useQuery } from "@tanstack/react-query";

export default function useProfileData() {
  const { user: logged } = useUser();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user", logged?.id],
    queryFn: async () => await getProfileDataService(),
  });

  const { user, resumes, totals } = data?.data || {};

  return {
    user,
    resumes,
    totals,
    isLoading,
    isError,
    error,
    refetch,
  };
}
