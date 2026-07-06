import { getResumeByIdService } from "@/lib/services/resume/getResumeByIdSerice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { parseResumeContent } from "../utils/parseResumeContent";

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

  const parsedResume = useMemo(() => {
    return selectedResume
      ? parseResumeContent(selectedResume.content)
      : { resume: null, error: null };
  }, [selectedResume]);

  const isPendingVersionReady =
    pendingVersion !== null &&
    version === pendingVersion &&
    selectedResume?.id === pendingVersion &&
    (parsedResume.resume !== null || parsedResume.error !== null);

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

    if (isPendingVersionReady || (!isFetching && !pendingVersionExists))
      setPendingVersion(null);
  }, [isFetching, isPendingVersionReady, pendingVersion, resumes]);

  return {
    id: id || "",
    version,
    isChangingVersion,
    changeVersion,
    activeResume: parsedResume.resume,
    activeResumeError: parsedResume.error,
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
