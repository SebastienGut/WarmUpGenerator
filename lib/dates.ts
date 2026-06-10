const FR_MONTHS: Record<string, string> = {
  janvier: "01",
  février: "02",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  août: "08",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  décembre: "12",
  decembre: "12",
};

/**
 * Convertit une date française ("19 mai 2026") en ISO 8601 ("2026-05-19").
 * Nécessaire pour les schemas JSON-LD (datePublished/dateModified) et le sitemap.
 */
export function frDateToISO(frDate: string): string {
  const match = frDate.trim().toLowerCase().match(/^(\d{1,2})(?:er)?\s+([a-zéûô]+)\s+(\d{4})$/);
  if (!match) return frDate;
  const [, day, month, year] = match;
  const mm = FR_MONTHS[month];
  if (!mm) return frDate;
  return `${year}-${mm}-${day.padStart(2, "0")}`;
}
