import type {
  AiGeneratedResume,
  ResumeType,
} from "@/lib/types/AiGeneratedResume";
import ResumeSkeleton from "./components/ResumeSkeleton";
import { PDFViewer } from "@react-pdf/renderer";
import ResumeClassic from "@/pages/resume/templates/classic";
import ResumeModern from "@/pages/resume/templates/modern";
import ResumeCreative from "@/pages/resume/templates/creative";
import ResumeExecutive from "@/pages/resume/templates/executive";
import EditModal from "../edit/components/EditModal";

interface props {
  type: ResumeType;
  resume: AiGeneratedResume;
  isLoading: boolean;
  id: string;
  isChangingVersion: boolean;
  allVersions?: { id: string; content: string }[];
  changeVersion: (version: string) => void;
  defaultVersion: string;
}

export default function ResumeWrapper({
  resume,
  type,
  isLoading,
  id,
  isChangingVersion,
  allVersions,
  changeVersion,
  defaultVersion,
}: props) {
  function renderResume() {
    if (!resume) return;

    switch (type) {
      case "classic":
        return <ResumeClassic resumeData={resume} />;
      case "modern":
        return <ResumeModern resumeData={resume} />;
      case "creative":
        return <ResumeCreative resumeData={resume} />;
      case "executive":
        return <ResumeExecutive resumeData={resume} />;
      default:
    }
  }

  return (
    <div className="relative max-h-full overflow-scroll rounded-lg">
      {(isLoading || isChangingVersion) && <ResumeSkeleton />}
      {!isLoading && !isChangingVersion && (
        <div className="h-full w-full relative">
          <PDFViewer width={"100%"} height={"100%"}>
            {renderResume()}
          </PDFViewer>
          <div className=" fixed top-4 right-4 ">
            <EditModal
              changeVersion={changeVersion}
              defaultVersion={defaultVersion}
              allVersions={allVersions}
              resumeData={resume}
              id={id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
