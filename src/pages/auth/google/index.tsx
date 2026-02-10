import { getMeService } from "@/lib/services/user/getMeService";
import { useUser } from "@/lib/store/userState";
import type { User } from "@/lib/types/User";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const { user, setUser } = useUser();
  //   const isLoading = true;

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

  if (error) return <Navigate to="/login" />;

  return (
    <div className="bg-muted/75 border backdrop-blur-md h-full flex items-center justify-center rounded-md">
      <p className="flex items-center gap-1 text-muted-foreground">
        <Loader className="animate-spin" />
        <span>Getting user Information...</span>
      </p>
    </div>
  );
}
