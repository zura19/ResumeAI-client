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
import SelectVersion from "./components/SelectVersion";
import { useUser } from "@/lib/store/userState";
import DeleteModal from "./components/DeleteModal";
import ChatWithAiButton from "./components/ChatWithAiButton";

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
  const { user } = useUser();
  const triggerClassName = "text-md font-medium";
  const isProOrEnterprise = user?.plan === "pro" || user?.plan === "enterprise";

  return (
    <div
      className={`h-full flex flex-col w-full bg-background/50 backdrop-blur-xl ${
        type === "modal" ? "p-0" : "p-6 border border-border/50 rounded-lg"
      }  overflow-y-scroll overflow-x-hidden `}
    >
      {type === "page" && (
        <div className="flex flex-col gap-0 mb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Resume Editor</h1>

            <DeleteModal
              totalVersions={allVersions?.length}
              resumeId={id}
              defaultVersion={defaultVersion}
            />
          </div>
          <p className="text-muted-foreground text-sm">
            If you are not satisfied with the generated resume, you can edit
            your resume details here.
          </p>
          {isProOrEnterprise && (
            <SelectVersion
              defaultVersion={defaultVersion}
              changeVersion={changeVersion}
              allVersions={allVersions}
            />
          )}
        </div>
      )}
      <Accordion type="single" collapsible>
        <AccordionItem disabled={disabledToOpen} value="personal-info">
          <AccordionTrigger className={triggerClassName}>
            Personal Info
          </AccordionTrigger>
          <AccordionContent>
            <PersonalInfo
              id={id}
              generatedResumeId={defaultVersion}
              resumeData={resumeData}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="summary">
          <AccordionTrigger className={triggerClassName}>
            Summary
          </AccordionTrigger>
          <AccordionContent>
            <Summary
              id={id}
              resumeData={resumeData}
              generatedResumeId={defaultVersion}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="experience">
          <AccordionTrigger className={triggerClassName}>
            Experience
          </AccordionTrigger>
          <AccordionContent>
            <Experience
              id={id}
              resumeData={resumeData}
              generatedResumeId={defaultVersion}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="education">
          <AccordionTrigger className={triggerClassName}>
            Education
          </AccordionTrigger>
          <AccordionContent>
            <Education
              id={id}
              resumeData={resumeData}
              generatedResumeId={defaultVersion}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="skills">
          <AccordionTrigger className={triggerClassName}>
            Skills
          </AccordionTrigger>
          <AccordionContent>
            <Skills
              id={id}
              resumeData={resumeData}
              generatedResumeId={defaultVersion}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem disabled={disabledToOpen} value="projects">
          <AccordionTrigger className={triggerClassName}>
            Projects
          </AccordionTrigger>
          <AccordionContent>
            <Projects
              id={id}
              resumeData={resumeData}
              generatedResumeId={defaultVersion}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {isProOrEnterprise && <ChatWithAiButton resumeId={id} />}
    </div>
  );
}
