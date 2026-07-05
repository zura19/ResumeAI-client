import { API, postHeadersCredentials } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import type { User } from "@/lib/types/User";
import type { LoginSchema } from "@/lib/schemas/loginSchema";

export async function loginService(
  body: LoginSchema
): PromiseResponseSuccess<{ user: User }> {
  const res = await fetch(`${API}/auth/login`, {
    ...postHeadersCredentials,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to log in");
  }

  return res.json();
}
