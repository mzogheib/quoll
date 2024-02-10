// TODO: Dynamically calculate the user's locale instead of hardcoding en-AU
/**
 * Formats an amount into a localized currency string.
 *
 * @param amount the amount, e.g. 1.54
 * @param currencyCode the currency code of the amount, e.g. AUD
 * @returns e.g. "A$1.54"
 *
 * @remarks if the amount is negative then the absolute value will be used.
 */
export const formatAmount = (amount: number, currencyCode: string) => {
  return Math.abs(amount).toLocaleString("en-AU", {
    style: "currency",
    currency: currencyCode,
  });
};
