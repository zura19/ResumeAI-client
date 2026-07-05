import { getResumeByIdService } from "@/lib/services/resume/getResumeByIdSerice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { parseResumeContent } from "../utils/parseResumeContent";

export default function useResumeData() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const version = searchParams.get("version");
  const [isChangingVersion, setIsChangingVersion] = useState(false);

  function changeVersion(nextVersion: string) {
    setIsChangingVersion(true);
    setSearchParams({ version: nextVersion });

    setTimeout(() => {
      setIsChangingVersion(false);
    }, 1000);
  }

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

  useEffect(() => {
    if (!selectedVersion || version === selectedVersion) return;
    if (version && !requestedResume && isFetching) return;

    setSearchParams({ version: selectedVersion }, { replace: true });
  }, [isFetching, requestedResume, selectedVersion, setSearchParams, version]);

  const parsedResume = useMemo(() => {
    return selectedResume
      ? parseResumeContent(selectedResume.content)
      : { resume: null, error: null };
  }, [selectedResume]);

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
