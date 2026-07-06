import type {
  AiGeneratedResume,
  ResumeType,
} from "@/lib/types/AiGeneratedResume";
import Edit from "./modules/edit";
import Logo from "@/components/shared/Logo";
import ResumeWrapper from "./modules/resume";
import useResumeData from "./hooks/useResumeData";
import { ErrorComponent } from "@/components/shared/ErrorComponents";
import DeleteModal from "./modules/edit/components/DeleteModal";

export default function ResumePage() {
  const {
    id,
    activeResume,
    activeResumeError,
    changeVersion,
    defaultVersion,
    error,
    isChangingVersion,
    isError,
    isLoading,
    isRefetching,
    resumes,
    type,
    title,
  } = useResumeData();
  const hasResumeContentError =
    Boolean(activeResumeError) && !isLoading && !isRefetching;

  return (
    <div>
      <Logo className="absolute top-4.5 left-3 " />

      <div className="max-w-350 px-4 mx-auto grid lg:grid-cols-[7fr_10fr] gap-6 py-16 h-dvh">
        {/* <AnimatedGradient /> */}
        {isError && (
          <div className="col-span-2 flex h-full flex-col items-center justify-center gap-4">
            <ErrorComponent
              title="Failed to load resume"
              message={error?.message || "Failed to load resume"}
            />
          </div>
        )}
        {hasResumeContentError && (
          <div className="col-span-2 flex h-full flex-col items-center justify-center gap-4">
            <ErrorComponent
              title="Resume version is invalid"
              message={activeResumeError || "Failed to render this resume."}
            />
            <DeleteModal
              isLoading={isLoading || isRefetching}
              totalVersions={resumes?.length}
              resumeId={id}
              defaultVersion={defaultVersion}
              triggerLabel="Delete this version"
            />
          </div>
        )}
        {isError || hasResumeContentError ? null : (
          <div className="hidden lg:block overflow-scroll">
            <Edit
              isLoading={isLoading || isRefetching}
              id={id}
              disabledToOpen={isLoading || isError}
              type="page"
              title={title || null}
              resumeData={activeResume as AiGeneratedResume}
              defaultVersion={defaultVersion}
              allVersions={resumes}
              changeVersion={changeVersion}
            />
          </div>
        )}

        {!isError && !hasResumeContentError && (
          <ResumeWrapper
            id={id}
            isLoading={isLoading || isRefetching}
            resume={activeResume as AiGeneratedResume}
            type={type as ResumeType}
            title={title || null}
            isChangingVersion={isChangingVersion}
            changeVersion={changeVersion}
            allVersions={resumes}
            defaultVersion={defaultVersion}
          />
        )}
      </div>
    </div>
  );
}
