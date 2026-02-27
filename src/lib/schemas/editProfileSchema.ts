import z from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().min(1, { error: "Name is required" }),
  lastName: z.string().min(1, { error: "Name is required" }),
  email: z.email().min(1, { error: "Email is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  profession: z.string().optional(),
});

export type EditProfile = z.infer<typeof editProfileSchema>;
