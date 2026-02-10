import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, getCredentials } from "../helpers";
import type { Plan, PlanName } from "@/lib/types/plan";

export async function getPlansByNameService(
  name: PlanName,
): PromiseResponseSuccess<Plan> {
  try {
    const res = await fetch(`${API}/plan/${name}`, {
      ...getCredentials,
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to get plan with name: " + name);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
