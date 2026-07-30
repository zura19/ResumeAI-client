import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { EditIcon, PlusIcon } from "lucide-react";
import ExperienceForm from "./ExperienceForm";
import { useState } from "react";

type ExperienceItem = AiGeneratedResume["experience"][0];

interface props {
  session: "edit" | "create";
  isPending?: boolean;
  exp?: ExperienceItem;
  addExperience?: (exp: ExperienceItem) => Promise<unknown>;
  editExperience?: (payload: {
    experienceId: string;
    experience: ExperienceItem;
  }) => Promise<unknown>;
}

export default function ExperienceModal(props: props) {
  const [open, setOpen] = useState(false);
  const { session, addExperience, exp, editExperience, isPending } = props;

  const closeModal = () => setOpen(false);
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
            <span className="font-medium">Add Experience</span>
            <PlusIcon className="size-5" strokeWidth={2.5} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {session === "edit" ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ExperienceForm
          session={session}
          addExperience={addExperience}
          editExperience={editExperience}
          exp={exp}
          handleClose={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}
