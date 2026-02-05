import Wrapper from "@/components/shared/Wrapper";
import { motion } from "framer-motion";
import Plans from "@/components/shared/plan/Plans";

export default function PlansPage() {
  return (
    <Wrapper className="h-dvh overflow-y-scroll">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        viewport={{ once: true }}
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

      <Plans />
    </Wrapper>
  );
}
