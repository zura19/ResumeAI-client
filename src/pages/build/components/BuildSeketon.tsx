import { Spinner } from "@/components/ui/spinner";

export default function BuildSeketon() {
  return (
    <div className="flex items-center justify-center gap-1 text-muted-foreground h-full">
      <Spinner className="size-5 animate-spin" />
      Checking...
    </div>
  );
}
