import Plans from "@/components/shared/plan/Plans";
import FormButton from "@/components/shared/FormButton";
import { RefreshCw } from "lucide-react";
import useUpdateDefaultPlansAction from "./hooks/actions/useUpdateDefaultPlansAction";

export default function AdminPlans() {
  const { updateDefaultPlans, isUpdatingDefaultPlans } =
    useUpdateDefaultPlansAction();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-background/50 p-4 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-3xl">Available Plans</h1>
          <p className="text-sm text-muted-foreground">
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
      </div>

      <Plans updateSession={true} />
    </div>
  );
}
