import { motion } from "framer-motion";
import { templates } from "@/pages/home/constants/templates";
import Section from "../../components/Section";
import TemplateCard from "./components/TemplateCard";
import { containerVariant, itemVariant } from "@/lib/animations/cardAppear";

export function TemplatesSection() {
  return (
    <Section
      id="templates"
      heading="Professional Templates"
      description="Choose from a variety of professionally designed templates"
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {templates.map((template) => (
          <motion.div key={template.name} variants={itemVariant}>
            <TemplateCard template={template} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
