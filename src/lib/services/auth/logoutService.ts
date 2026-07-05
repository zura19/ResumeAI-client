import { API, postHeadersCredentials } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function logOutService(): PromiseResponseSuccess<null> {
  const res = await fetch(`${API}/auth/logout`, {
    ...postHeadersCredentials,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to log out");
  }

  return res.json();
}
