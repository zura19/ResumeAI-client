import FormButton from "@/components/shared/FormButton";
import UserAvatar from "@/components/shared/UserAvatar";
import UserPlanBadge from "@/components/shared/UserPlanBadge";
import { Button } from "@/components/ui/button";
import useLogout from "@/lib/hooks/useLogout";
import { uppercaseFirstLetter } from "@/lib/utils";
import { CalendarIcon, MailIcon, MapPinIcon, SettingsIcon } from "lucide-react";

interface props {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function UserSection({ user }: props) {
  const { logOut, isLoggingOut } = useLogout();
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border bg-background/50 backdrop-blur-lg p-8 rounded-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <UserAvatar
          goto="/profile"
          className="h-24 w-24 text-2xl  border border-primary/30"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {uppercaseFirstLetter(user?.firstName || "")}{" "}
              {uppercaseFirstLetter(user?.lastName || "")}
            </h1>
            <UserPlanBadge plan="pro" />
          </div>
          <p className="text-muted-foreground text-sm">
            Full-Stack Developer &middot; Open to opportunities
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MailIcon className="h-3.5 w-3.5" />
              {user?.email}
            </span>
            <span className="flex items-center gap-1">
              <MapPinIcon className="h-3.5 w-3.5" />
              San Francisco, CA
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-3.5 w-3.5" />
              Member since Jan 2024
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border text-muted-foreground hover:text-foreground hover:bg-secondary self-start bg-transparent"
        >
          <SettingsIcon className="h-4 w-4" />
          Edit Profile
        </Button>

        <FormButton
          onClick={logOut}
          loading={isLoggingOut}
          disabled={isLoggingOut}
          variant="outline"
          loadingText="Logging out..."
          type="button"
          size="sm"
          className="w-full gap-2 border-border text-muted-foreground hover:text-foreground hover:bg-secondary self-start bg-transparent"
        >
          Log Out
        </FormButton>
      </div>
    </div>

    // <Card className="px-4 py-8 bg-background/50 backdrop-blur-md">
    //   <CardContent className="flex items-start  justify-between">
    //     <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
    //       <UserAvatar goto="/profile" className="h-24 w-24 text-2xl" />
    //       <div className="flex-1 space-y-2">
    //         <h1 className="text-3xl font-bold tracking-tight text-foreground">
    //           {user?.firstName} {user?.lastName}
    //         </h1>
    //         <p className="text-base text-muted-foreground">{user?.email}</p>
    //       </div>
    //     </div>
    //     <div>
    //       <FormButton
    //         onClick={logOut}
    //         loading={isLoggingOut}
    //         disabled={isLoggingOut}
    //         variant="destructive"
    //         loadingText="Logging out..."
    //         type="button"
    //         size="lg"
    //         className="mt-8"
    //       >
    //         Log Out
    //       </FormButton>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
