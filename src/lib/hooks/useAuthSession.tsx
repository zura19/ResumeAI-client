import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../store/userState";
import { getMeService } from "../services/user/getMeService";
import { refreshSessionService } from "../services/auth/sessionService";
import { API } from "../services/helpers";

const publicRoutes = ["/", "/login", "/signup", "/plans"];

export default function useAuthSession() {
  const { setUser, clearUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isInterceptorInstalled = useRef(false);
  const pathnameRef = useRef(location.pathname);
  const refreshPromise = useRef<Promise<boolean> | null>(null);

  // pathnameRef.current = location.pathname;

  function clearAuthState() {
    clearUser();
    localStorage.removeItem("user");
  }

  function isUnauthorizedError(error: unknown) {
    return (
      error instanceof Error &&
      error.message.toLowerCase().includes("unauthorized")
    );
  }

  async function refreshSessionOnce() {
    if (refreshPromise.current) {
      return await refreshPromise.current;
    }

    refreshPromise.current = refreshSessionService().finally(() => {
      refreshPromise.current = null;
    });

    return await refreshPromise.current;
  }

  function redirectToLogin() {
    if (!publicRoutes.includes(pathnameRef.current)) {
      navigate("/login", { replace: true });
    }
  }

  function installSessionInterceptor() {
    if (isInterceptorInstalled.current) {
      return;
    }

    const fetchBeforeInterceptor = window.fetch.bind(window);

    window.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;

      const isApiRequest = url.startsWith(API);
      const isAuthRequest = url.startsWith(`${API}/auth/`);
      const requestInit = isApiRequest
        ? {
            ...init,
            credentials: init?.credentials ?? "include",
          }
        : init;

      const res = await fetchBeforeInterceptor(input, requestInit);

      if (res.status !== 401 || !isApiRequest || isAuthRequest) {
        return res;
      }

      if (!(await refreshSessionOnce())) {
        clearAuthState();
        redirectToLogin();
        return res;
      }

      const retryRes = await fetchBeforeInterceptor(input, requestInit);

      if (retryRes.status === 401) {
        clearAuthState();
        redirectToLogin();
      }

      return retryRes;
    }) as typeof fetch;

    isInterceptorInstalled.current = true;
  }

  const { isLoading } = useQuery({
    queryKey: ["auth-session"],
    queryFn: async () => {
      installSessionInterceptor();

      try {
        const data = await getMeService();
        setUser(data.data.user);
        return data.data.user;
      } catch (error) {
        if (!isUnauthorizedError(error)) {
          console.log(error);
          clearAuthState();
          return null;
        }

        const isRefreshed = await refreshSessionOnce();

        if (!isRefreshed) {
          clearAuthState();
          return null;
        }

        try {
          const data = await getMeService();
          setUser(data.data.user);
          return data.data.user;
        } catch (error) {
          console.log(error);
          clearAuthState();
          return null;
        }
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { isLoading };
}
