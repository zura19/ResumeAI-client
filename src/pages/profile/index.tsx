import { ErrorComponent } from "@/components/shared/ErrorComponents";
import Wrapper from "@/components/shared/Wrapper";
import { getProfileDataService } from "@/lib/services/user/profileDataService";
import { useUser } from "@/lib/store/userState";
import { useQuery } from "@tanstack/react-query";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import UserSection from "./modules/UserSection";
import { Separator } from "@/components/ui/separator";
import { TotalsSection } from "./modules/TotalsSection";
import ProfileTabsSection from "./modules/ProfileTabsSection";

export default function Profile() {
  const { user: logged } = useUser();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user", logged?.id],
    queryFn: async () => await getProfileDataService(),
  });

  if (isError)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorComponent message={error.message} onRetry={refetch} />
      </div>
    );

  const { user, resumes, totals } = data?.data || {};

  console.log(resumes);

  if (!isError)
    return (
      <div className=" overflow-scroll max-h-[83dvh] scrollbar-hide">
        <Wrapper className="py-1 ">
          {isLoading && <ProfileSkeleton />}
          {!isLoading && (
            <div className=" space-y-12">
              <UserSection user={user} />
              <Separator />
              <TotalsSection totals={totals} />
              <ProfileTabsSection resumes={resumes} />
            </div>
          )}
        </Wrapper>
      </div>
    );
}
