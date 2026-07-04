import { motion } from "framer-motion";
import { features } from "@/pages/home/constants/features";
import Section from "../../components/Section";
import FeatureCard from "./components/FeatureCard";
import { containerVariant, itemVariant } from "@/lib/animations/cardAppear";

export function FeaturesSection() {
  return (
    <Section
      id="features"
      heading="Everything You Need to Land Your Dream Job"
      description="Powerful AI features designed to help you create resumes that get results"
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariant}
            className="rounded-lg"
          >
            <FeatureCard feature={feature} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
