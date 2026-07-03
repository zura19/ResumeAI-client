import type {
  Education,
  Experience,
  Project,
} from "@/lib/types/buildResumeTypes";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useBuildResume from "@/lib/store/buildResumeState";
import { shortString } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface educationProps {
  step: "education";
  data: Education[];
}

interface experienceProps {
  step: "experience";
  data: Experience[];
}

interface projectsProps {
  step: "projects";
  data: Project[];
}

const content = {
  trigger: {
    education: "See all education",
    experience: "See all experience",
    projects: "See all projects",
  },
  title: {
    education: "All Educations",
    experience: "All Experiences",
    projects: "All Projects",
  },
  empty: {
    education: "No education added yet.",
    experience: "No experience added yet.",
    projects: "No project added yet.",
  },
};

function StepModal({
  data,
  step,
}: educationProps | experienceProps | projectsProps) {
  const { handleRemoveEducation, handleRemoveExperience, handleRemoveProject } =
    useBuildResume();

  function handleDelete(index: number) {
    if (step === "education") {
      handleRemoveEducation(index);
      return;
    }

    if (step === "experience") {
      handleRemoveExperience(index);
      return;
    }

    handleRemoveProject(index);
  }

  return (
    <Dialog>
      <DialogTrigger className=" cursor-pointer hover:underline">
        {content.trigger[step]} ({data.length})
      </DialogTrigger>
      <DialogContent className="bg-background/50 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>
            {content.title[step]} ({data.length})
          </DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        {step === "education" && data.length === 0 && (
          <p className="text-sm text-muted-foreground">{content.empty[step]}</p>
        )}
        {step === "education" &&
          data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex gap-4 text-sm justify-between"
            >
              <div>
                <p>{shortString(item.university, 40)}</p>
                <p>{shortString(item.fieldOfStudy, 40)}</p>
                <p className="text-muted-foreground">
                  {item.startDate} - {item.stillStudying ? "Now" : item.endDate}
                </p>
              </div>
              <Button
                size="icon-sm"
                variant="destructive"
                onClick={() => handleDelete(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}

        {step === "experience" && data.length === 0 && (
          <p className="text-sm text-muted-foreground">{content.empty[step]}</p>
        )}
        {step === "experience" &&
          data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex gap-4 text-sm justify-between"
            >
              <div>
                <p>{shortString(item.company, 40)}</p>
                <p>{shortString(item.position, 40)}</p>
                <p className="text-muted-foreground">
                  {item.startDate} - {item.stillWorking ? "Now" : item.endDate}
                </p>
              </div>
              <Button
                size="icon-sm"
                variant="destructive"
                onClick={() => handleDelete(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}

        {step === "projects" && data.length === 0 && (
          <p className="text-sm text-muted-foreground">{content.empty[step]}</p>
        )}
        {step === "projects" &&
          data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex gap-4 text-sm justify-between"
            >
              <div>
                <p>{shortString(item.title, 40)}</p>
                <p className="text-muted-foreground">
                  {shortString(item.description, 70)}
                </p>
              </div>
              <Button
                size="icon-sm"
                variant="destructive"
                onClick={() => handleDelete(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default StepModal;
