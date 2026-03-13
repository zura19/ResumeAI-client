import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Summary from "./modules/summary";
import PersonalInfo from "./modules/personal-info";
import Skills from "./modules/skills";
import Education from "./modules/education";
import Experience from "./modules/experience";
import Projects from "./modules/projects";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import SelectVersion from "./components/SelectVersion";

interface props {
  resumeData: AiGeneratedResume;
  type: "modal" | "page";
  disabledToOpen?: boolean;
  id: string;
  allVersions?: { id: string; content: string }[];
  changeVersion: (version: string) => void;
  defaultVersion: string;
}

export default function Edit({
  resumeData,
  type = "page",
  disabledToOpen,
  id,
  allVersions,
  changeVersion,
  defaultVersion,
}: props) {
  const triggerClassName = "text-md font-medium";

  return (
    <div
      className={`h-full flex flex-col w-full bg-background/50 backdrop-blur-xl ${
        type === "modal" ? "p-0" : "p-6 border border-border/50 rounded-lg"
      }  overflow-y-scroll overflow-x-hidden `}
    >
      {type === "page" && (
        <div className="flex flex-col gap-0 mb-4">
          <h1 className="text-xl font-bold">Resume Editor</h1>
          <p className="text-muted-foreground text-sm">
            If you are not satisfied with the generated resume, you can edit
            your resume details here.
          </p>

          <SelectVersion
            defaultVersion={defaultVersion}
            changeVersion={changeVersion}
            allVersions={allVersions}
          />
        </div>
      )}
      <Accordion type="single" collapsible>
        <AccordionItem disabled={disabledToOpen} value="personal-info">
          <AccordionTrigger className={triggerClassName}>
            Personal Info
          </AccordionTrigger>
          <AccordionContent>
            <PersonalInfo id={id} resumeData={resumeData} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="summary">
          <AccordionTrigger className={triggerClassName}>
            Summary
          </AccordionTrigger>
          <AccordionContent>
            <Summary id={id} resumeData={resumeData} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="experience">
          <AccordionTrigger className={triggerClassName}>
            Experience
          </AccordionTrigger>
          <AccordionContent>
            <Experience id={id} resumeData={resumeData} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="education">
          <AccordionTrigger className={triggerClassName}>
            Education
          </AccordionTrigger>
          <AccordionContent>
            <Education id={id} resumeData={resumeData} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="skills">
          <AccordionTrigger className={triggerClassName}>
            Skills
          </AccordionTrigger>
          <AccordionContent>
            <Skills id={id} resumeData={resumeData} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="projects">
          <AccordionTrigger className={triggerClassName}>
            Projects
          </AccordionTrigger>
          <AccordionContent>
            <Projects id={id} resumeData={resumeData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        size="sm"
        asChild
        className="rounded-full h-12 flex mt-auto font-semibold"
      >
        <Link
          to={`/resume/${id}/chat`}
          className=" text-muted-foreground flex items-center"
        >
          <Sparkles className=" text-indigo-600" />
          <span>Chat with AI</span>
        </Link>
      </Button>
    </div>
  );
}
