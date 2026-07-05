import { getMeService } from "@/lib/services/user/getMeService";
import { useUser } from "@/lib/store/userState";
import type { User } from "@/lib/types/User";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useGoogleAuthCallback() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const { data, error, isSuccess } = useQuery({
    queryKey: ["google-user"],
    queryFn: getMeService,
    enabled: !user,
  });

  useEffect(() => {
    if (!isSuccess || !data?.success) return;

    const user: Pick<
      User,
      "email" | "firstName" | "lastName" | "role" | "id" | "plan"
    > = data.data.user;

    setUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      id: user.id,
      plan: user.plan,
    });
    navigate("/profile");
  }, [data, isSuccess, navigate, setUser]);

  return {
    error,
  };
}
