import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/store/userState";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Props {
  goto?: string;
  className?: string;
}

function getInitial(value?: string) {
  return value?.trim().charAt(0).toUpperCase() ?? "";
}

export default function UserAvatar({ goto, className }: Props) {
  const navigate = useNavigate();
  const { user } = useUser();
  const initials =
    `${getInitial(user?.firstName)}${getInitial(user?.lastName)}` || "U";

  function handleGo() {
    if (!goto) return;
    navigate(goto);
  }

  return (
    <Avatar
      onClick={handleGo}
      className={cn("cursor-pointer text-xs", className)}
    >
      <AvatarImage src="" />
      {user && (
        <AvatarFallback className=" font-bold">{initials}</AvatarFallback>
      )}
    </Avatar>
  );
}
