import { motion } from "framer-motion";
import { steps } from "@/pages/home/constants/how-it-works";
import Section from "../../components/Section";
import HowItWorksCard from "./components/HowItWorksCard";

export function HowItWorksSection() {
  return (
    <Section
      id="how-it-works"
      heading="How It Works"
      description="Three simple steps to create your perfect resume"
      background="black"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-8 md:grid-cols-3"
      >
        {steps.map((step, i) => {
          return (
            <motion.div
              key={step.step}
              viewport={{ once: true }}
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
              }}
              animate={{ y: i % 2 === 0 ? [-20, 15, -20] : [20, -15, 20] }}
              transition={{
                y: {
                  delay: 0,
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              className="rounded-lg"
            >
              <HowItWorksCard step={step} i={i} length={steps.length} />
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
