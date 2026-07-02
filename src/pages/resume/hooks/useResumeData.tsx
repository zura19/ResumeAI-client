import { getResumeByIdService } from "@/lib/services/resume/getResumeByIdSerice";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
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

  const activeResume = useMemo(() => {
    if (!res) return;

    if (!version) {
      const latestResume = res.resumes.at(-1);
      return latestResume
        ? (JSON.parse(latestResume.content) as AiGeneratedResume)
        : undefined;
    }

    const selectedResume = res.resumes.find((resume) => resume.id === version);
    return selectedResume
      ? (JSON.parse(selectedResume.content) as AiGeneratedResume)
      : undefined;
  }, [res, version]);

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
    defaultVersion: version || res?.resumes.at(-1)?.id || "",
  };
}
