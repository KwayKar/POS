export function formatDateRange(val) {
  if (!val?.start || !val?.end) return "";
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const start = new Date(val.start).toLocaleDateString(undefined, options);
  const end = new Date(val.end).toLocaleDateString(undefined, options);
  return `${start} - ${end}`;
}