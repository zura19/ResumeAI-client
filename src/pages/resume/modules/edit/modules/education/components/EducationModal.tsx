import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import EducationForm from "./EducationForm";
import { useState } from "react";

type EducationItem = AiGeneratedResume["education"][0];

interface props {
  session: "edit" | "create";
  isPending?: boolean;
  addEducation?: (edu: EducationItem) => Promise<unknown>;
  editEducation?: (payload: {
    educationId: string;
    education: EducationItem;
  }) => Promise<unknown>;
  edu?: EducationItem;
}

export default function EducationModal(props: props) {
  const [open, setOpen] = useState(false);
  const { session, edu, addEducation, editEducation, isPending } = props;

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {session === "edit" ? (
          <Button
            size={"icon-sm"}
            className="size-6 rounded-sm"
            disabled={isPending}
          >
            <EditIcon className="size-3" />
          </Button>
        ) : (
          <Button
            className="flex items-center text-foreground ml-auto rounded-full bg-indigo-500 hover:bg-indigo-600"
            disabled={isPending}
          >
            <span className="font-medium">Add Education</span>
            <PlusIcon className="size-5" strokeWidth={2.5} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {session === "edit" ? "Edit Education" : "Add Education"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EducationForm
          handleClose={handleClose}
          session={session}
          addEducation={addEducation}
          editEducation={editEducation}
          edu={edu}
        />
      </DialogContent>
    </Dialog>
  );
}
