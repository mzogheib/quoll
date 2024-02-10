/**
 * Formats a distance in meters into kilometers.
 *
 * @param distance in meters
 * @returns a string such as "1,501.38 kms"
 */
export const formatDistance = (distance: number) => {
  const kms = (distance / 1000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${kms} km`;
};
