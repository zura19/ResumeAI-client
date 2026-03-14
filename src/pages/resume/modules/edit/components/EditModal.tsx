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

interface props {
  resumeData: AiGeneratedResume;
  id: string;
  changeVersion: (version: string) => void;
  defaultVersion: string;
  allVersions?: { id: string; content: string }[];
}

export default function EditModal({
  resumeData,
  id,
  changeVersion,
  defaultVersion,
  allVersions,
}: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          // size={"icon-sm"}
          className=" rounded-full text-xs sm:text-md  lg:hidden"
          variant={"secondary"}
        >
          Edit Resume
          <EditIcon className=" text-3 sm:text-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className=" overflow-scroll max-h-[90vh]  sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between mr-4">
            <DialogTitle className="">Resume Editor</DialogTitle>
            <DeleteModal resumeId={id} defaultVersion={defaultVersion} />
          </div>
          <DialogDescription className="">
            If you are not satisfied with the generated resume, you can edit
            your resume details here.
          </DialogDescription>
        </DialogHeader>

        <SelectVersion
          defaultVersion={defaultVersion}
          changeVersion={changeVersion}
          allVersions={allVersions}
        />

        <Edit
          changeVersion={changeVersion}
          defaultVersion={defaultVersion}
          allVersions={allVersions}
          type="modal"
          id={id}
          resumeData={resumeData}
        />
      </DialogContent>
    </Dialog>
  );
}
