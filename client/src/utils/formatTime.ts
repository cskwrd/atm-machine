import { formatDistanceToNow } from "date-fns";

export function fToNow(date: Date) {
  return formatDistanceToNow(date, {
    addSuffix: true,
  });
}
