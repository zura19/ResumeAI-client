import { API } from "@/lib/services/helpers";
import { useState } from "react";

export default function useGoogleLoginAction() {
  const [loading, setLoading] = useState(false);

  function handleGoogleLogin() {
    setLoading(true);
    window.open(`${API}/auth/google`, "_self");
  }

  return {
    loading,
    handleGoogleLogin,
  };
}
