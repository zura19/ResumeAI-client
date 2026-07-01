import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface AddBtnProps {
  hide: boolean;
  onClick: () => void;
}

export default function AddBtn({ hide, onClick }: AddBtnProps) {
  if (hide) {
    return null;
  }

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="flex size-6 items-center justify-center rounded-full bg-muted hover:bg-muted/20  absolute top-[68%] -translate-1/2 right-0 -translate-x-2"
      onClick={onClick}
    >
      <PlusIcon className="size-4 " strokeWidth={2.5} />
    </Button>
  );
}
