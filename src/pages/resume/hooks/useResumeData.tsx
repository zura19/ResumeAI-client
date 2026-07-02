import { getResumeByIdService } from "@/lib/services/resume/getResumeByIdSerice";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

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

  const selectedVersion = useMemo(() => {
    if (!res?.resumes.length) return "";

    const versionExists = res.resumes.some((resume) => resume.id === version);

    if (version && versionExists) {
      return version;
    }

    return res.resumes.at(-1)?.id || "";
  }, [res, version]);

  useEffect(() => {
    if (!selectedVersion || version === selectedVersion) {
      return;
    }

    setSearchParams({ version: selectedVersion }, { replace: true });
  }, [selectedVersion, setSearchParams, version]);

  const activeResume = useMemo(() => {
    if (!res) return;

    const selectedResume = res.resumes.find(
      (resume) => resume.id === selectedVersion,
    );

    return selectedResume
      ? (JSON.parse(selectedResume.content) as AiGeneratedResume)
      : undefined;
  }, [res, selectedVersion]);

  return {
    id: id || "",
    version,
    isChangingVersion,
    changeVersion,
    activeResume,
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
