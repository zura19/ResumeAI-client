import type { ContactSchema } from "@/lib/schemas/contactSchema";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";
import { API, postHeadersCredentials } from "../helpers";

export async function contactService(
  body: ContactSchema,
): PromiseResponseSuccess<null> {
  const res = await fetch(`${API}/email/contact`, {
    ...postHeadersCredentials,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to send contact message");
  }

  return res.json();
}
