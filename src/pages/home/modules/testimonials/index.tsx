import { motion } from "framer-motion";
import { testimonials } from "@/pages/home/constants/testimonials";
import Section from "../../components/Section";
import TestimonialCard from "./components/TestimonialCard";
import { containerVariant, itemVariant } from "@/lib/animations/cardAppear";

export function TestimonialsSection() {
  return (
    <Section
      id="testimonials"
      heading="Trusted by Job Seekers"
      description="See what our users are saying about ResumeAI"
      background="black"
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.name}
            variants={itemVariant}
            className="rounded-lg"
          >
            <TestimonialCard testimonial={testimonial} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
