import Plans from "@/components/shared/plan/Plans";
import FormButton from "@/components/shared/FormButton";
import { RefreshCw } from "lucide-react";
import useUpdateDefaultPlansAction from "./hooks/actions/useUpdateDefaultPlansAction";
import SpotlightCard from "@/components/shared/SpotlightCard";

export default function AdminPlans() {
  const { updateDefaultPlans, isUpdatingDefaultPlans } =
    useUpdateDefaultPlansAction();

  return (
    <div className="space-y-6">
      <SpotlightCard cardClassName="flex flex-col gap-6 rounded-lg border border-border bg-background/50 p-6 backdrop-blur-lg sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-center sm:text-left font-bold text-3xl">
            Available Plans
          </h1>
          <p className="text-center sm:text-left text-sm text-muted-foreground">
            Update the existing free, pro, and enterprise plan records with the
            backend defaults. This does not create new plans.
          </p>
        </div>

        <FormButton
          type="button"
          loading={isUpdatingDefaultPlans}
          disabled={isUpdatingDefaultPlans}
          loadingText="Updating..."
          onClick={() => updateDefaultPlans()}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="h-4 w-4" />
          Update Default Plans
        </FormButton>
      </SpotlightCard>

      <Plans updateSession={true} />
    </div>
  );
}
