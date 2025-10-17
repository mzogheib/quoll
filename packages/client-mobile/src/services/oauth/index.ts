import { generateRandomString } from "@quoll/lib/modules";

import { makeStorage } from "@utils/storage";
import { OAuthResponse } from "./types";

const storage = makeStorage<{ token: string }>("oauth");

/**
 * OAuth Flow for Mobile
 *
 * 1. User clicks 'connect' on the settings page and BE returns a url for that feed
 * 2. requestAuth is called and does the following:
 *    - Generates a random state token for CSRF protection
 *    - Stores the token locally
 *    - Appends the token to the OAuth URL as a state parameter
 *    - Opens an in-app browser with the modified URL
 * 3. User accepts/rejects the auth request in the in-app browser
 * 4. OAuth provider redirects back to the app via deep link (quoll://oauth/callback)
 * 5. The deep link handler extracts the code and state from the URL
 * 6. validateOAuthResponse validates the state token matches what we stored
 * 7. If valid, the code is returned to be exchanged for an access token
 */

/**
 * Generates a random token and stores it for later validation.
 *
 * @returns the generated token
 */
const makeToken = (): string => {
  const token = generateRandomString(16);
  storage.setProperty("token", token);
  return token;
};

/**
 * Validates that the provided token matches the stored token.
 * Clears the stored token after validation.
 *
 * @param token the token to validate
 * @returns true if the token is valid
 */
const isValidToken = (token: string): boolean => {
  const storedToken = storage.getData()?.token;
  storage.clear();
  return storedToken !== null && token !== null && storedToken === token;
};

/**
 * Creates an OAuth URL with a state parameter containing a CSRF token.
 *
 * @param url the base OAuth URL from the backend
 * @returns the modified URL with state parameter
 */
export const makeAuthUrl = (url: string): string => {
  const token = makeToken();
  const newUrl = new URL(url);
  newUrl.searchParams.append("state", token);
  return newUrl.toString();
};

/**
 * Validates an OAuth response and returns the authorization code if valid.
 *
 * @param response the OAuth response from the deep link
 * @returns the authorization code if valid
 * @throws error message if validation fails
 */
export const validateOAuthResponse = (response: OAuthResponse): string => {
  if (!response || !response.state) {
    storage.clear();
    throw "Unknown response.";
  }

  const { code, state, error } = response;

  // Check if user denied access
  if (error === "access_denied") {
    storage.clear();
    throw "Access denied.";
  }

  // Check if we have a code
  if (!code) {
    storage.clear();
    throw "No authorization code received.";
  }

  // Validate the state token (CSRF protection)
  if (!isValidToken(state)) {
    throw "Invalid state token. Please try again.";
  }

  return code;
};

/**
 * Clears any stored OAuth state.
 * Useful for cleanup after errors or cancellation.
 */
export const clearOAuthState = () => {
  storage.clear();
};
