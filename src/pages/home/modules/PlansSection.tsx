import { PlanCard } from "@/components/shared/plan/PlanCard";
import { plans } from "@/constants/plans/plans";
import Section from "../components/Section";
import { containerVariant, itemVariant } from "@/lib/animations/cardAppear";
import { motion } from "framer-motion";

export function PlansSection() {
  return (
    // < className="py-20">
    <Section
      id="plans"
      heading="Plans and Pricing"
      description="Get started immediately for free. Upgrade for more AI credits, templates, and advanced features."
      background=""
      gradient="red"
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={itemVariant}
            className="rounded-lg"
          >
            <PlanCard key={plan.id} plan={plan} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
