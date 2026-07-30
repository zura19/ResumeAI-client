import { getResumeByIdService } from "@/lib/services/resume/getResumeByIdService";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { GeneratedResumeResponse } from "@/lib/services/resume/getResumeByIdService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function extractResumeData(
  generated: GeneratedResumeResponse,
): AiGeneratedResume {
  return {
    summary: generated.summary,
    personalInfo: generated.personalInfo,
    education: generated.education,
    // @ts-expect-error TODO: fix this is all types
    experience: generated.experiences,
    skills: generated.skills,
    projects: generated.projects,
  };
}

export default function useResumeData() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const version = searchParams.get("version");
  const [pendingVersion, setPendingVersion] = useState<string | null>(null);

  const {
    data: res,
    isLoading,
    isError,
    error,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["resume", id],
    queryFn: async () => {
      const data = await getResumeByIdService(id || "");
      const generatedResumes = data.data.resume.generatedResumes;
      return {
        resumes: generatedResumes,
        type: data.data.resume.type,
        title: data.data.resume.title,
      };
    },
    refetchOnWindowFocus: false,
  });

  const resumes = res?.resumes ?? [];
  const requestedResume = resumes.find((resume) => resume.id === version);
  const latestVersion = resumes.at(-1)?.id || "";

  const selectedVersion =
    requestedResume?.id || (version && isFetching ? version : latestVersion);
  const selectedResume =
    requestedResume ?? resumes.find((resume) => resume.id === selectedVersion);

  const activeResume = useMemo(() => {
    return selectedResume ? extractResumeData(selectedResume) : null;
  }, [selectedResume]);

  const isPendingVersionReady =
    pendingVersion !== null &&
    version === pendingVersion &&
    selectedResume?.id === pendingVersion &&
    activeResume !== null;

  const isChangingVersion = pendingVersion !== null && !isPendingVersionReady;

  function changeVersion(nextVersion: string) {
    if (nextVersion === version) return;

    setPendingVersion(nextVersion);
    setSearchParams({ version: nextVersion });
  }

  useEffect(() => {
    if (!selectedVersion || version === selectedVersion) return;
    if (version && !requestedResume && isFetching) return;

    setSearchParams({ version: selectedVersion }, { replace: true });
  }, [isFetching, requestedResume, selectedVersion, setSearchParams, version]);

  useEffect(() => {
    if (!pendingVersion) return;

    const pendingVersionExists = resumes.some(
      (resume) => resume.id === pendingVersion,
    );

    if (isPendingVersionReady || (!isFetching && !pendingVersionExists)) {
      const setter = () => setPendingVersion(null);
      setter();
    }
  }, [isFetching, isPendingVersionReady, pendingVersion, resumes]);

  return {
    id: id || "",
    version,
    isChangingVersion,
    changeVersion,
    activeResume,
    activeResumeError: null,
    resumes: res?.resumes,
    type: res?.type,
    title: res?.title,
    isLoading,
    isError,
    error,
    isRefetching,
    defaultVersion: selectedVersion,
  };
}
