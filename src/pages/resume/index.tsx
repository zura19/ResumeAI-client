import type {
  AiGeneratedResume,
  ResumeType,
} from "@/lib/types/AiGeneratedResume";
import Edit from "./modules/edit";
import Logo from "@/components/shared/Logo";
import ResumeWrapper from "./modules/resume";
import useResumeData from "./hooks/useResumeData";

export default function ResumePage() {
  const {
    id,
    activeResume,
    changeVersion,
    defaultVersion,
    error,
    isChangingVersion,
    isError,
    isLoading,
    isRefetching,
    resumes,
    type,
  } = useResumeData();

  return (
    <div>
      <Logo className="absolute top-4.5 left-3 " />

      <div className="max-w-350 px-4 mx-auto grid lg:grid-cols-[7fr_10fr] gap-6 py-16 h-dvh">
        {/* <AnimatedGradient /> */}
        {isError && (
          <p className="text-center col-span-2">
            {error?.message || "Failed to load resume"}
          </p>
        )}
        {isError ? null : (
          <div className="hidden lg:block overflow-scroll">
            <Edit
              id={id}
              disabledToOpen={isLoading || isError}
              type="page"
              resumeData={activeResume as AiGeneratedResume}
              defaultVersion={defaultVersion}
              allVersions={resumes}
              changeVersion={changeVersion}
            />
          </div>
        )}

        <ResumeWrapper
          id={id}
          isLoading={isLoading || isRefetching}
          resume={activeResume as AiGeneratedResume}
          type={type as ResumeType}
          isChangingVersion={isChangingVersion}
          changeVersion={changeVersion}
          allVersions={resumes}
          defaultVersion={defaultVersion}
        />
      </div>
    </div>
  );
}
