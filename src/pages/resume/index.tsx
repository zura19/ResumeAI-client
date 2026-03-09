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

export default function ResumePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version");

  function findResume(generatedResumes: { id: string; content: string }[]) {
    if (!version) {
      return JSON.parse(
        generatedResumes.at(generatedResumes.length - 1)?.content || "",
      );
    }

    return JSON.parse(
      generatedResumes.find((r) => r.id === version)?.content || "",
    );
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
        resume: findResume(generatedResumes),
        type: d.data.resume.type,
      };
    },
  });

  console.log(res?.resume);

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
              resumeData={res?.resume as AiGeneratedResume}
            />
          </div>
        )}

        <ResumeWrapper
          id={id || ""}
          isLoading={isLoading}
          resume={res?.resume as AiGeneratedResume}
          type={res?.type as ResumeType}
        />
      </div>
    </div>
  );
}
