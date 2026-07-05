import type { SignupSchema } from "@/lib/schemas/signupSchema";
import { API, postHeaders } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import type { User } from "@/lib/types/User";

export async function registerService(
  body: SignupSchema
): PromiseResponseSuccess<{ user: User }> {
  const res = await fetch(`${API}/auth/register`, {
    ...postHeaders,
    body: JSON.stringify({
      ...body,
      fullName: undefined,
      firstName: body.fullName.split(" ")[0],
      lastName: body.fullName.split(" ")[1],
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to register");
  }

  return res.json();
}
