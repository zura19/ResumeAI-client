import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";
import type { Plan } from "@/lib/types/plan";

export async function getPlansService(): PromiseResponseSuccess<Plan[]> {
  try {
    const res = await fetch(`${API}/plan`, {
      ...getCredentials,
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to get plans");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
