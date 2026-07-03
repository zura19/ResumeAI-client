import StepHeading from "../components/StepHeading";
import StepFooter from "./StepFooter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepModal from "../components/StepModal";
import { Textarea } from "@/components/ui/textarea";
import useProjectsStep from "../hooks/useProjectsStep";

export default function ProjectsStep() {
  const {
    data,
    nextStep,
    title,
    setTitle,
    description,
    setDescription,
    disabledAdd,
    addProject,
  } = useProjectsStep();

  return (
    <StepHeading
      heading="Projects"
      description="Please provide your projects. You can add multiple projects."
    >
      <div className="flex flex-col  gap-7">
        <div className="px-1 space-y-7 h-112 overflow-y-scroll">
          <div className="flex items-center justify-between">
            <StepModal step="projects" data={data.projects} />

            <Button
              size={"icon-lg"}
              className="bg-indigo-600 rounded-full text-gray-100 font-bold hover:bg-indigo-500"
              disabled={disabledAdd}
              onClick={addProject}
            >
              <Plus className="size-5.5" strokeWidth={2.5} />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="font-semibold">
              Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              id="title"
              placeholder="Project title"
            />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="description" className="font-semibold">
              Description
            </Label>
            <Textarea
              className="resize-none min-h-32"
              value={description}
              onChange={(e) =>
                e.target.value.length <= 250 && setDescription(e.target.value)
              }
              name="description"
              id="description"
              placeholder="In this project I worked on..."
            />
            <div className="absolute bottom-3.5 right-2 text-[10px]   bg-muted px-2 text-muted-foreground py-1 rounded-2xl border">
              {description.length}/250
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <StepFooter
          // loading={isPending}
          loadingText="Creating resume..."
          disabledNext={data.projects.length === 0}
          handleNext={nextStep}
          nextText="Next"
        />
      </div>
    </StepHeading>
  );
}
