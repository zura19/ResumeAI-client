const MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const PRESENT_LABELS = new Set(["present", "now"]);

type SkillCategory = {
  title: string;
  values: string[];
};

export function formatTemplateDate(value?: string) {
  if (!value) {
    return "";
  }

  const normalizedValue = value.trim();
  if (!normalizedValue) {
    return "";
  }

  if (PRESENT_LABELS.has(normalizedValue.toLowerCase())) {
    return "Present";
  }

  const parsedDate = new Date(normalizedValue.replaceAll("/", "-"));

  if (Number.isNaN(parsedDate.getTime())) {
    return normalizedValue;
  }

  return MONTH_YEAR_FORMATTER.format(parsedDate);
}

export function formatTemplateDateRange(startDate?: string, endDate?: string) {
  const formattedStart = formatTemplateDate(startDate);
  const formattedEnd = formatTemplateDate(endDate) || "Present";

  if (!formattedStart) {
    return formattedEnd;
  }

  return `${formattedStart} - ${formattedEnd}`;
}

export function formatEducationLine(
  degree?: string | null,
  fieldOfStudy?: string | null,
) {
  const normalizedDegree = degree?.trim();
  const normalizedField = fieldOfStudy?.trim();

  if (normalizedDegree && normalizedField) {
    return `${normalizedDegree} in ${normalizedField}`;
  }

  return normalizedDegree || normalizedField || "";
}

export function visibleSkillsCategories(
  soft: string[],
  technical: string[],
  languages: string[],
) {
  const categories: SkillCategory[] = [
    { title: "Soft Skills", values: soft },
    { title: "Technical Skills", values: technical },
    { title: "Languages", values: languages },
  ];

  return categories.filter((category) => category.values.length > 0);
}
