import { ISO8601Date, ISO8601Time } from "./types";

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
export const getStartOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * @param date the Date object
 * @returns a string in the format `YYYY-MM-DD`
 */
export const makeISO8601Date = (date: Date): ISO8601Date => {
  const YYYY = date.getFullYear().toString();
  const MM = (date.getMonth() + 1).toString().padStart(2, "0");
  const DD = date.getDate().toString().padStart(2, "0");

  return `${YYYY}-${MM}-${DD}`;
};

/**
 * @param date a full date and time in ISO 8601 format
 * @returns the number of seconds since the epock
 */
export const getUnixTimestamp = (date: Date) =>
  Math.floor(date.getTime() / 1000);

const ISO8601_TIME_REGEX = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/;

/**
 * Finds and returns an ISO 8601 time, i.e. `HH:MM:SS`, in a string.
 *
 * @param input the input string
 * @returns the matched time if found or `null` if not.
 *
 * @remarks returns the first match only
 */
export const extractISO8601Time = (input: string): ISO8601Time | null => {
  const match = input.match(ISO8601_TIME_REGEX);

  if (match && match.length > 0) {
    const timeElements = match[0].split(":");
    const hour = parseInt(timeElements[0], 10);
    const minute = parseInt(timeElements[1], 10);
    const second = parseInt(timeElements[2], 10);
    const isValid =
      hour >= 0 &&
      hour < 24 &&
      minute >= 0 &&
      minute < 60 &&
      second >= 0 &&
      second < 60;

    return isValid ? match[0] : null;
  }

  return null;
};

/**
 * Checks if an input string begins with an ISO 8601 time.
 *
 * @param input the input to check
 * @returns `true` if
 */
export const startsWithISO8601Time = (input: string) => {
  return ISO8601_TIME_REGEX.test(input.substr(0, 8));
};
