import { API, postHeadersCredentials } from "../helpers";

export async function refreshSessionService(): Promise<boolean> {
  try {
    const res = await fetch(`${API}/auth/refresh`, {
      ...postHeadersCredentials,
    });

    return res.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}
