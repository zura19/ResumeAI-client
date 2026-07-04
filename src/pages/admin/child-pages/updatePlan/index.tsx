import { ErrorComponent } from "@/components/shared/ErrorComponents";
import FormButton from "@/components/shared/FormButton";
import { Spinner } from "@/components/ui/spinner";
import PlanFormFields from "./components/PlanFormFields";
import useUpdatePlanData from "./hooks/useUpdatePlanData";

export default function UpdatePlan() {
  const { form, isLoading, isError, error, isPending, setField, submitUpdate } =
    useUpdatePlanData();

  if (isError) {
    return (
      <ErrorComponent
        title="Something went wrong"
        message={error?.message || "Failed to load plan data."}
      />
    );
  }

  if (isLoading)
    return (
      <div className=" flex items-center justify-center">
        <Spinner />
      </div>
    );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await submitUpdate();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <PlanFormFields form={form} setField={setField} />

      <FormButton
        loading={isPending}
        disabled={isPending}
        loadingText="Updating..."
      >
        Update
      </FormButton>
    </form>
  );
}
