const PRESENT_LABELS = new Set(["present", "now"]);

function isValidDate(value: Date) {
  return !Number.isNaN(value.getTime());
}

function createLocalDate(year: number, month: number, day: number) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return undefined;
  }

  if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
    return undefined;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
}

export function parseResumeDate(value?: string | null, fallback = new Date()) {
  if (!value) {
    return new Date(fallback);
  }

  const normalizedValue = value.trim();
  if (!normalizedValue || PRESENT_LABELS.has(normalizedValue.toLowerCase())) {
    return new Date(fallback);
  }

  const numericParts = normalizedValue.split(/[/-]/).map(Number);

  if (numericParts.every(Number.isFinite)) {
    const [first, second, third] = numericParts;

    if (numericParts.length === 2) {
      const date = createLocalDate(first, second, 1);

      if (date) {
        return date;
      }
    }

    if (numericParts.length === 3) {
      const yearFirstDate = createLocalDate(first, second, third);

      if (yearFirstDate) {
        return yearFirstDate;
      }

      const monthFirstDate = createLocalDate(third, first, second);

      if (monthFirstDate) {
        return monthFirstDate;
      }
    }
  }

  const parsedDate = new Date(normalizedValue.replaceAll("/", "-"));

  if (isValidDate(parsedDate)) {
    return parsedDate;
  }

  return new Date(fallback);
}

export function formatResumeDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}
