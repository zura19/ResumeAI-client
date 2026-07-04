import FormButton from "@/components/shared/FormButton";
import FormInput from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
import type { EditProfile } from "@/lib/schemas/editProfileSchema";
import useEditProfileAction from "../hooks/actions/useEditProfileAction";

export default function EditProfileForm({
  user,
  onClose,
}: {
  user: EditProfile;
  onClose: () => void;
}) {
  const { form, onSubmit } = useEditProfileAction({ user, onClose });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-4 py-4"
      >
        <FormInput
          control={form.control}
          label="First Name"
          name="firstName"
          placeholder="John"
        />

        <FormInput
          control={form.control}
          label="Last Name"
          name="lastName"
          placeholder="Doe"
        />

        <FormInput
          control={form.control}
          label="Email"
          name="email"
          placeholder="o0Mw2@example.com"
        />

        <FormInput
          control={form.control}
          label="Phone"
          name="phone"
          placeholder="+1 234 567 890"
        />

        <FormInput
          control={form.control}
          label="Address"
          name="address"
          placeholder="123 Main St, Anytown, USA"
        />

        <FormInput
          control={form.control}
          label="Profession"
          name="profession"
          placeholder="Software Engineer"
        />

        <FormButton
          loading={form.formState.isSubmitting}
          loadingText="Saving Changes..."
          type="submit"
        >
          Save Changes
        </FormButton>
      </form>
    </Form>
  );
}
