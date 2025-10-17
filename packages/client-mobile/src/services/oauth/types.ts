/**
 * OAuth response data from the deep link callback.
 */
export type OAuthResponse = {
  code?: string;
  state?: string;
  error?: string;
};
