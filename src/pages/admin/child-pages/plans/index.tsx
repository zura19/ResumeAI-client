import Plans from "@/components/shared/plan/Plans";

export default function AdminPlans() {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">Available Plans</h1>
      <Plans updateSession={true} />
    </div>
  );
}
