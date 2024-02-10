/**
 * The purpose of these types is to add meaning to date & time variables that
 * need to take this format. They could be enhanced to enforce the string
 * structure but that becomes overly complicated
 */

/**
 * A date string formatted as `YYYY-MM-DD`.
 */
export type ISO8601Date = string;

/**
 * A time string formatted as `HH:MM:SS`.
 */
export type ISO8601Time = string;

/**
 * A date & time string formatted as `YYYY-MM-DDTHH:MM:SSZ`.
 */
export type ISO8601DateAndTime = string;
