/**
 * A date string formatted as `YYYY-MM-DD`.
 *
 * @remarks the purpose of this type is to add meaning to date variables that
 * need to take this format. It could be enhanced to enforce the string
 * structure but that becomes overly complicated
 */
export type ISO8601Date = string;

/**
 * A date string formatted as `YYYY-MM-DDTHH:MM:SSZ`.
 *
 * @remarks the purpose of this type is to add meaning to date variables that
 * need to take this format. It could be enhanced to enforce the string
 * structure but that becomes overly complicated
 */
export type ISO8601DateAndTime = string;
