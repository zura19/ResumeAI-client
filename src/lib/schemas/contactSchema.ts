import z from "zod";

export const contactSchema = z.object({
  email: z.email({ error: "Enter a valid email address" }),
  title: z
    .string()
    .trim()
    .min(3, { error: "Title must be at least 3 characters" })
    .max(120, { error: "Title must be 120 characters or less" }),
  description: z
    .string()
    .trim()
    .min(10, { error: "Description must be at least 10 characters" })
    .max(2000, { error: "Description must be 2000 characters or less" }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
