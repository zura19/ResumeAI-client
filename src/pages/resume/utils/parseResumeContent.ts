import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import z, { type ZodRawShape } from "zod";

const stringSchema = z.preprocess((value) => {
  if (typeof value === "string") return value;
  if (value == null) return "";

  return String(value);
}, z.string());

const stringArraySchema = z.preprocess((value) => {
  if (typeof value === "string") return [value];
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => (item == null ? "" : String(item)))
    .filter(Boolean);
}, z.array(z.string()));

const objectSchema = <Schema extends ZodRawShape>(schema: Schema) =>
  z.preprocess(
    (value) =>
      value && typeof value === "object" && !Array.isArray(value) ? value : {},
    z.object(schema),
  );

const resumeContentSchema = objectSchema({
  summary: stringSchema,
  personalInfo: objectSchema({
    fullName: stringSchema,
    email: stringSchema,
    phone: stringSchema,
    address: stringSchema,
  }),
  education: z.preprocess(
    (value) => (Array.isArray(value) ? value : []),
    z.array(
      objectSchema({
        university: stringSchema,
        degree: stringSchema,
        fieldOfStudy: stringSchema,
        startDate: stringSchema,
        endDate: stringSchema.optional(),
        stillStudying: z.coerce.boolean().optional(),
      }),
    ),
  ),
  experience: z.preprocess(
    (value) => (Array.isArray(value) ? value : []),
    z.array(
      objectSchema({
        company: stringSchema,
        position: stringSchema,
        responsibilities: stringArraySchema,
        startDate: stringSchema,
        endDate: stringSchema.optional(),
      }),
    ),
  ),
  skills: objectSchema({
    soft: stringArraySchema,
    technical: stringArraySchema,
    languages: stringArraySchema,
  }),
  projects: z.preprocess(
    (value) => (Array.isArray(value) ? value : []),
    z.array(
      objectSchema({
        title: stringSchema,
        technologies: stringArraySchema,
        features: stringArraySchema,
      }),
    ),
  ),
});

export function parseResumeContent(content: string):
  | { resume: AiGeneratedResume; error: null }
  | { resume: null; error: string } {
  try {
    const parsedContent = JSON.parse(content);

    if (
      !parsedContent ||
      typeof parsedContent !== "object" ||
      Array.isArray(parsedContent)
    ) {
      return {
        resume: null,
        error:
          "This generated resume is not a valid resume object. Please choose another version or generate it again.",
      };
    }

    const result = resumeContentSchema.safeParse(parsedContent);

    if (!result.success) {
      return {
        resume: null,
        error:
          "This generated resume has an unsupported structure. Please choose another version or generate it again.",
      };
    }

    return { resume: result.data as AiGeneratedResume, error: null };
  } catch {
    return {
      resume: null,
      error:
        "This generated resume is not valid JSON. Please choose another version or generate it again.",
    };
  }
}
