/**
 * Offsets a date by the input number of days.
 *
 * @example
 *
 * const yesterday = getOffsetDate(new Date(), -1);
 * const tomorrow = getOffsetDate(new Date(), 1);
 *
 * @param date the date to offset
 * @param offset number of days to offset by
 * @returns the offset date
 */
export const getOffsetDate = (date: Date, offset: number = 0) => {
  const msInDay = 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + offset * msInDay);
};

/**
 * Returns a date object at the end of its day, i.e. at 23:59:59:999.
 *
 * @param date the date for the day
 * @returns the input date at the end of its day
 */
export const getEndOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

/**
 * Returns a date object at the start of its day, i.e. at 00:00:00:000.
 *
 * @param date the date for the day
 * @returns the input date at the start of its day
 */
const getStartOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

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
