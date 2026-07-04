import { getMeService } from "@/lib/services/user/getMeService";
import { useUser } from "@/lib/store/userState";
import type { User } from "@/lib/types/User";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useGoogleAuthCallback() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const { error } = useQuery({
    queryKey: ["google-user"],
    queryFn: async () => {
      const data = await getMeService();

      if (data.success) {
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
      }

      return navigate("/profile");
    },
    enabled: !user,
  });

  return {
    error,
  };
}
