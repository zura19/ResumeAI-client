import { ErrorComponent } from "@/components/shared/ErrorComponents";
import Wrapper from "@/components/shared/Wrapper";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import UserSection from "./modules/UserSection";
import { Separator } from "@/components/ui/separator";
import { TotalsSection } from "./modules/TotalsSection";
import ProfileTabsSection from "./modules/tabs";
import useProfileData from "./hooks/useProfileData";

export default function Profile() {
  const { user, resumes, totals, isLoading, isError, error, refetch } =
    useProfileData();

  if (isError)
    return (
      <div className="h-full flex items-center justify-center">
        <ErrorComponent
          message={error?.message || "Failed to load profile data"}
          onRetry={refetch}
        />
      </div>
    );

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
