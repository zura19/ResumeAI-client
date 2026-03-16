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
import { deleteAllVersionsService } from "@/lib/services/resume/deleteAllVersionsService";
import { deleteOneVersionsService } from "@/lib/services/resume/deleteOneVersionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface props {
  resumeId: string;
  defaultVersion: string;
}

export default function DeleteModal({ resumeId, defaultVersion }: props) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: deleteAll, isPending: isDeletingAll } = useMutation({
    mutationFn: async () => await deleteAllVersionsService(resumeId),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/profile");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: deleteOne, isPending: isDeletingOne } = useMutation({
    mutationFn: async () =>
      await deleteOneVersionsService(resumeId, defaultVersion),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [`resume-${resumeId}`],
      });
      navigate(`/resume/${resumeId}`, { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  console.log(resumeId, defaultVersion);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size="icon-sm"
          className="rounded-full flex mt-auto font-semibold"
        >
          <EllipsisVertical className="" />
        </Button>
      </DialogTrigger>

      <DialogContent className=" overflow-scroll max-h-[90vh]  sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="">Delete Resume</DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>

        <div className=" flex flex-col gap-4">
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
