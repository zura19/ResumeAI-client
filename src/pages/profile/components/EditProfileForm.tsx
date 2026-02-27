import FormButton from "@/components/shared/FormButton";
import FormInput from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
import {
  editProfileSchema,
  type EditProfile,
} from "@/lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function EditProfileForm({ user }: { user: EditProfile }) {
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
    console.log(data);
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

        <FormButton type="submit">Save Changes</FormButton>
      </form>
    </Form>
  );
}
