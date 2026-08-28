import { API, patchHeadersCredentials } from "@/lib/services/helpers";
import type { PromiseResponseSuccess } from "@/lib/types/requestResponseTypes";

interface ProjectBody {
  title: string;
  technologies: string[];
  features: string[];
}

export async function updateProjectService(
  generatedResumeId: string,
  projectId: string,
  project: ProjectBody,
): PromiseResponseSuccess<ProjectBody & { id: string }> {
  try {
    const res = await fetch(`${API}/generated-resumes/${generatedResumeId}/project/${projectId}`, {
      ...patchHeadersCredentials,
      body: JSON.stringify(project),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update project");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
