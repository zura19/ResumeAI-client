import { Form } from "@/components/ui/form";
import StepHeading from "../components/StepHeading";
import FormInput from "@/components/shared/FormInput";
import StepFooter from "./StepFooter";
import usePersonalInfoStep from "../hooks/usePersonalInfoStep";

export default function PersonalInfoStep() {
  const { form, onSubmit } = usePersonalInfoStep();

  return (
    <StepHeading
      heading="Personal Info"
      description="Please provide your personal name, email, and phone number."
    >
      <Form {...form}>
        <form
          className="space-y-6 flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className=" space-y-6 h-[415px] overflow-y-scroll px-1">
            <FormInput
              label="Full Name"
              placeholder="John Doe"
              name="fullName"
              control={form.control}
            />
            <FormInput
              label="Email Address"
              placeholder="example@ex.com"
              name="email"
              control={form.control}
            />

            <FormInput
              label="Phone Number"
              placeholder="123-456-7890"
              name="phone"
              control={form.control}
            />

            <FormInput
              label="Address"
              placeholder="123 Main St"
              name="address"
              control={form.control}
            />
          </div>

          <div className="mt-auto py-2">
            <StepFooter disabledNext={!form.formState.isValid} />
          </div>
        </form>
      </Form>
    </StepHeading>
  );
}
