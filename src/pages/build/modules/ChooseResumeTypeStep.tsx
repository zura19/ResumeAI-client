import StepHeading from "../components/StepHeading";
import StepFooter from "./StepFooter";
import { motion } from "framer-motion";
import { resumeTypeData } from "@/constants/resume/resumeTypeData";
import useChooseResumeTypeStep from "../hooks/useChooseResumeTypeStep";

export default function ChooseResumeTypeStep() {
  const { type, handleChangeType, createResume, isPending } =
    useChooseResumeTypeStep();

  return (
    <StepHeading
      heading="Choose Resume Type"
      description="Select the type of resume you want to create."
    >
      <div className="grid grid-cols-2 gap-4 rounded-lg px-1 sm:px-4 h-100 sm:h-110 overflow-y-scroll">
        {resumeTypeData.map((image) => (
          <motion.div
            key={image.type}
            initial={{ opacity: 0, y: 10, boxShadow: "0px 0px 0px 0px" }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow:
                type === image.type
                  ? "0px 0px 20px 5px oklch(58.5% 0.233 277.117)"
                  : "0px 0px 0px 0px oklch(58.5% 0.233 277.117)",
            }}
            transition={{
              duration: 0.5,
              delay: image.delay,
              ease: "easeInOut",
              boxShadow: {},
            }}
            whileHover={{
              scale: 1.01,
            }}
            onClick={() => handleChangeType(image.type)}
            className={`relative   rounded-lg cursor-pointer overflow-x-hidden`}
          >
            <img
              className="absolute w-full h-full object-cover object-top "
              src={image.src}
              alt={image.alt}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-auto  py-5">
        <StepFooter
          loading={isPending}
          loadingText="Creating resume..."
          handleNext={createResume}
          nextText="Build Resume"
        />
      </div>
    </StepHeading>
  );
}
