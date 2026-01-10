import { getMeService } from "@/lib/services/user/getMeService";
import { useUser } from "@/lib/store/userState";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const { user, setUser } = useUser();
  //   const isLoading = true;

  const navigate = useNavigate();

  const { isLoading, error } = useQuery({
    queryKey: ["google-user"],
    queryFn: async () => {
      const data = await getMeService();

      if (data.success) setUser(data.data.user);
      return navigate("/profile");
    },
    enabled: !user,
  });

  if (error) return <Navigate to="/login" />;

  return (
    <div className="bg-muted/75 border backdrop-blur-md h-full flex items-center justify-center rounded-md">
      {isLoading && (
        <p className="flex items-center gap-1 text-muted-foreground">
          <Loader className="animate-spin" />
          <span>Getting user Information...</span>
        </p>
      )}
    </div>
  );
}
