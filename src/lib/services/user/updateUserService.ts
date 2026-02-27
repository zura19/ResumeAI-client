import type { EditProfile } from "@/lib/schemas/editProfileSchema";
import { API, putHeadersCredentials } from "../helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function updateUserService(
  data: EditProfile,
): PromiseResponseSuccess<null> {
  try {
    const res = await fetch(`${API}/user/profile`, {
      ...putHeadersCredentials,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to update user");
    }
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
