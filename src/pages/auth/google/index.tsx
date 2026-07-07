import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";
import useGoogleAuthCallback from "../hooks/useGoogleAuthCallback";

export default function GoogleCallback() {
  const { error } = useGoogleAuthCallback();

  if (error) return <Navigate to="/login" />;

  return (
    <div className=" border backdrop-blur-md h-full flex items-center justify-center">
      <p className="flex items-center gap-1 text-muted-foreground">
        <Loader className="animate-spin" />
        <span>Getting user Information...</span>
      </p>
    </div>
  );
}
