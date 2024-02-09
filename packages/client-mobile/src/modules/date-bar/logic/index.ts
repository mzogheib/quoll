import { getOffsetDate, getEndOfDay, getStartOfDay } from "@quoll/client-lib";

/**
 * Creates a date filter for a given input date.
 *
 * @remarks
 *
 * A date filter looks like this:
 *
 * ```typescript
 * { createdAfter, createdBefore }
 * ```
 *
 * where:
 *
 * - `createdAfter` is the end of the day before the input
 * - `createdBefore` is the start of the day after the input
 *
 * This can be used to fetch data that spans the entire day of the input date.
 *
 * @param date the date for the filter
 * @returns the filter object
 */
export const makeDateFilter = (date: Date) => {
  const dayBefore = getOffsetDate(date, -1);
  const dayAfter = getOffsetDate(date, 1);
  const createdAfter = getEndOfDay(dayBefore);
  const createdBefore = getStartOfDay(dayAfter);
  return { createdAfter, createdBefore };
};
