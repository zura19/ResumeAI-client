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
import type { Link } from "@/lib/types/AiGeneratedResume";
import type { LinkBody } from "@/lib/services/resume/edit/createLinkService";
import { useState } from "react";
import LinkForm from "./LinkForm";

interface LinkModalProps {
  session: "edit" | "create";
  isPending?: boolean;
  addLink?: (link: LinkBody) => Promise<unknown>;
  editLink?: (payload: {
    linkId: string;
    link: LinkBody;
  }) => Promise<unknown>;
  link?: Link;
}

export default function LinkModal({
  session,
  isPending,
  addLink,
  editLink,
  link,
}: LinkModalProps) {
  const [open, setOpen] = useState(false);

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
            <span className="font-medium">Add Link</span>
            <PlusIcon className="size-5" strokeWidth={2.5} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {session === "edit" ? "Edit Link" : "Add Link"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <LinkForm
          handleClose={handleClose}
          session={session}
          addLink={addLink}
          editLink={editLink}
          link={link}
        />
      </DialogContent>
    </Dialog>
  );
}
