import {
  getOffsetDate,
  getEndOfDay,
  getStartOfDay,
  ISO8601Date,
} from "@quoll/client-lib";
import { DateFilter } from "../types";

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
 * This can be used to fetch data that spans the entire duration of the input date.
 *
 * @param date the date for the filter in ISO 8601 format
 * @returns the filter object
 */
export const makeDateFilter = (date: ISO8601Date): DateFilter => {
  const _date = new Date(date);
  const dayBefore = getOffsetDate(_date, -1);
  const dayAfter = getOffsetDate(_date, 1);
  const createdAfter = getEndOfDay(dayBefore);
  const createdBefore = getStartOfDay(dayAfter);
  return { createdAfter, createdBefore };
};
