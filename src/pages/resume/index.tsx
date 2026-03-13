import { getResumeByIdService } from "@/lib/services/resume/getResumeByIdSerice";
import type {
  AiGeneratedResume,
  ResumeType,
} from "@/lib/types/AiGeneratedResume";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import Edit from "./modules/edit";
import Logo from "@/components/shared/Logo";
import ResumeWrapper from "./modules/resume";
import { useMemo, useState } from "react";

export default function ResumePage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const version = searchParams.get("version");
  const [isChangingVersion, setIsChangingVersion] = useState(false);

  function changeVersion(version: string) {
    setIsChangingVersion(true);
    setSearchParams({ version });
    setTimeout(() => {
      setIsChangingVersion(false);
    }, 1000);
  }

  const {
    data: res,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`resume-${id}`, id],
    queryFn: async () => {
      const d = await getResumeByIdService(id || "");
      const generatedResumes = d.data.resume.generatedResumes;
      return {
        resumes: generatedResumes,
        type: d.data.resume.type,
      };
    },
  });

  const activeResume = useMemo(() => {
    if (!res) return;
    const generatedResumes = res?.resumes;
    if (!version) {
      return JSON.parse(
        generatedResumes.at(generatedResumes.length - 1)?.content || "",
      );
    }

    return JSON.parse(
      generatedResumes.find((r) => r.id === version)?.content || "",
    );
  }, [version, res]);

  console.log(res?.resumes);

  return (
    <div>
      <Logo className="absolute top-4.5 left-3 " />

      <div className="max-w-350 px-4 mx-auto grid lg:grid-cols-[7fr_10fr] gap-6 py-16 h-dvh">
        {/* <AnimatedGradient /> */}
        {isError && <p className="text-center col-span-2">{error.message}</p>}
        {isError ? null : (
          <div className="hidden lg:block overflow-scroll">
            <Edit
              id={id || ""}
              disabledToOpen={isLoading || isError}
              type="page"
              resumeData={activeResume as AiGeneratedResume}
              defaultVersion={version || res?.resumes.at(-1)?.id || ""}
              allVersions={res?.resumes}
              changeVersion={changeVersion}
            />
          </div>
        )}

        <ResumeWrapper
          id={id || ""}
          isLoading={isLoading}
          resume={activeResume as AiGeneratedResume}
          type={res?.type as ResumeType}
          isChangingVersion={isChangingVersion}
        />
      </div>
    </div>
  );
}
