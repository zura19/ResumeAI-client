import { API, putHeadersCredentials } from "../helpers";

interface UpdateDefaultPlansResponse {
  data: null;
  message: string;
  success?: boolean;
}

export async function updateDefaultPlansService(): Promise<UpdateDefaultPlansResponse> {
  try {
    const res = await fetch(`${API}/plan/default`, {
      ...putHeadersCredentials,
    });

    if (!res.ok) {
      let message = "Failed to update default plans";

      try {
        const error = await res.json();
        message = error.message || message;
      } catch {
        // Keep the fallback message when the API does not return JSON.
      }

      throw new Error(message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
