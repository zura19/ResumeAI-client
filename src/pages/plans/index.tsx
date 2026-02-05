import Wrapper from "@/components/shared/Wrapper";
import { PlanCard } from "@/components/shared/PlanCard";
import { plans } from "@/constants/plans/plans";
import { containerVariant, itemVariant } from "@/lib/animations/cardAppear";
import { motion } from "framer-motion";

export default function Plans() {
  return (
    <Wrapper className="h-dvh overflow-y-scroll">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            y: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 backdrop-blur-xl px-4 py-1.5"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            New
          </span>
          <span className="text-sm text-foreground">
            AI-Powered Resume Building
          </span>
        </motion.div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
          Plans and Pricing
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
          Get started immediately for free. Upgrade for more AI credits,
          templates, and advanced features.
        </p>
      </motion.div>

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
    </Wrapper>
  );
}
