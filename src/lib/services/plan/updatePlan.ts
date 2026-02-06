import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, putHeadersCredentials } from "../helpers";
import type { Plan } from "@/lib/types/plan";

export async function updatePlanservice(
  id: string,
  body: Partial<Plan>,
): PromiseResponseSuccess<Plan> {
  try {
    console.log(body);
    const res = await fetch(`${API}/plan/${id}`, {
      ...putHeadersCredentials,
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to update plan with id: " + id);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
