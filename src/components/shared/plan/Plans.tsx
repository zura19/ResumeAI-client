import { PlanCard } from "@/components/shared/plan/PlanCard";
import { containerVariant, itemVariant } from "@/lib/animations/cardAppear";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getPlansService } from "@/lib/services/plan/getPlans";
import PlanSkeleton from "./PlanSkeleton";
import { useInView } from "react-intersection-observer";

export default function Plans() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when component comes into view
    threshold: 0.1, // Trigger when 10% of component is visible
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlansService,
    staleTime: 3 * 60 * 60 * 1000, // 3 hour
    enabled: inView,
  });

  const plans = data?.data || [];

  console.log(data);

  return (
    <div ref={ref}>
      {isError && (
        <div className=" flex items-center justify-center">
          <p>Something went wrong</p>
        </div>
      )}

      {isLoading && (
        <PlanSkeleton />
        // <div className="h-dvh flex items-center justify-center"></div>
      )}

      {!isError && !isLoading && (
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
      )}
    </div>
  );
}
