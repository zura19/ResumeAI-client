import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { Link, LinkType } from "@/lib/types/AiGeneratedResume";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

export interface LinkBody {
  url: string;
  type: LinkType;
}

export async function updateLinkService(
  generatedResumeId: string,
  linkId: string,
  link: LinkBody,
): PromiseResponseSuccess<Link> {
  try {
    const res = await fetch(
      `${API}/generated-resumes/${generatedResumeId}/link/${linkId}`,
      {
        ...patchHeadersCredentials,
        body: JSON.stringify(link),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update link");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
