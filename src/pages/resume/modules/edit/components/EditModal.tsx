import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import Edit from "..";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import SelectVersion from "./SelectVersion";
import DeleteModal from "./DeleteModal";
import { useUser } from "@/lib/store/userState";
import ResumeTitle from "./ResumeTitle";
import DuplicateResumeButton from "./DuplicateResumeButton";

interface props {
  isLoading: boolean;
  resumeData: AiGeneratedResume;
  id: string;
  title: string | null;
  changeVersion: (version: string) => void;
  defaultVersion: string;
  allVersions?: { id: string; content: string }[];
}

export default function EditModal({
  isLoading,
  resumeData,
  id,
  title,
  changeVersion,
  defaultVersion,
  allVersions,
}: props) {
  const { user } = useUser();
  const isProOrEnterprise = user?.plan === "pro" || user?.plan === "enterprise";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className=" rounded-full text-xs sm:text-md  lg:hidden"
          variant={"secondary"}
        >
          Edit Resume
          <EditIcon className=" text-3 sm:text-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className=" overflow-scroll max-h-[90vh]  sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Resume Editor</DialogTitle>
          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center sm:justify-between sm:mr-4">
            <ResumeTitle isLoading={isLoading} id={id} title={title} />
            <div className="flex items-center gap-2">
              <DuplicateResumeButton
                resumeId={id}
                generatedId={defaultVersion}
              />
              <DeleteModal resumeId={id} defaultVersion={defaultVersion} />
            </div>
          </div>
          <DialogDescription className="">
            If you are not satisfied with the generated resume, you can edit
            your resume details here.
          </DialogDescription>
        </DialogHeader>

        {isProOrEnterprise && (
          <SelectVersion
            defaultVersion={defaultVersion}
            changeVersion={changeVersion}
            allVersions={allVersions}
          />
        )}
        <Edit
          isLoading={isLoading}
          changeVersion={changeVersion}
          defaultVersion={defaultVersion}
          allVersions={allVersions}
          type="modal"
          id={id}
          title={title}
          resumeData={resumeData}
        />
      </DialogContent>
    </Dialog>
  );
}
