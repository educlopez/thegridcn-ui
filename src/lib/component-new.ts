import { componentCreationDates } from "./component-dates.generated";

const NEW_THRESHOLD_DAYS = 14;

export function isNewComponent(id: string): boolean {
  const dateStr = componentCreationDates[id];
  if (!dateStr) {
    return false;
  }
  const created = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= NEW_THRESHOLD_DAYS;
}
