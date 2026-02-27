import FormButton from "@/components/shared/FormButton";
import FormInput from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
import {
  editProfileSchema,
  type EditProfile,
} from "@/lib/schemas/editProfileSchema";
import { updateUserService } from "@/lib/services/user/updateUserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditProfileForm({
  user,
  onClose,
}: {
  user: EditProfile;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const form = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      profession: user.profession || "",
    },
  });

  async function onSubmit(data: EditProfile) {
    const res = await updateUserService(data);

    if (res.success) {
      toast.success(res.message);
      form.reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } else {
      toast.error(res.message);
    }
  }

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
