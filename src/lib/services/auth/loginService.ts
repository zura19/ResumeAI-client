import { API, postHeadersCredentials } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import type { User } from "@/lib/types/User";
import { toast } from "sonner";
import type { LoginSchema } from "@/lib/schemas/loginSchema";

export async function loginService(
  body: LoginSchema,
): PromiseResponseSuccess<{ user: User }> {
  try {
    const res = await fetch(`${API}/auth/login`, {
      ...postHeadersCredentials,

      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.message || "Failed to log in");
      throw new Error(error.message || "Failed to log in");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
