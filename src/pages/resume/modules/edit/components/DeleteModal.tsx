import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import useDeleteResumeAction from "../../../hooks/actions/useDeleteResumeAction";

interface props {
  resumeId: string;
  defaultVersion: string;
  totalVersions?: number;
  triggerLabel?: string;
  isLoading?: boolean;
}

export default function DeleteModal({
  resumeId,
  defaultVersion,
  totalVersions,
  triggerLabel,
  isLoading,
}: props) {
  const { open, setOpen, deleteAll, deleteOne, isDeletingAll, isDeletingOne } =
    useDeleteResumeAction({
      resumeId,
      defaultVersion,
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          disabled={isLoading}
          size={triggerLabel ? "default" : "icon-sm"}
          className={
            triggerLabel ? "font-semibold" : "rounded-full font-semibold"
          }
        >
          <Trash2 className="" />
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className=" overflow-scroll max-h-[90vh]  sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="">Delete Resume</DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>

        <div className=" flex flex-col gap-4">
          {totalVersions && totalVersions > 1 && (
            <>
              <Button
                onClick={() => deleteOne()}
                disabled={isDeletingOne}
                className="h-10"
                variant="outline"
              >
                Delete Only Current Version{" "}
              </Button>

              <div className="grid items-center gap-4 grid-cols-[1fr_auto_1fr]">
                <Separator />
                <p>Or</p>
                <Separator />
              </div>
            </>
          )}

          <Button
            onClick={() => deleteAll()}
            disabled={isDeletingAll}
            className="h-10"
            variant="outline"
          >
            Delete All Versions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
