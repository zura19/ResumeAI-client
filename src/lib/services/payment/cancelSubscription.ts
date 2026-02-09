import { API, postHeadersCredentials } from "../helpers";

export async function cancleSubscriptionService() {
  try {
    const res = await fetch(`${API}/payment/cancel`, {
      ...postHeadersCredentials,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to cancel subscription");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
