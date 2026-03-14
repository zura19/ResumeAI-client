import { API } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export async function deleteOneVersionsService(
  id: string,
  generatedId: string,
): PromiseResponseSuccess<null> {
  try {
    const res = await fetch(`${API}/resume/generated/${id}/${generatedId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error.message || "Failed to delete resume");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
