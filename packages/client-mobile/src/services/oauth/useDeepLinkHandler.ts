import { useEffect } from "react";
import { Linking } from "react-native";

import { validateOAuthResponse } from "./index";
import { OAuthResponse } from "./types";

type OnSuccess = (code: string) => void;
type OnError = (error: string) => void;

/**
 * Parses an OAuth callback URL and extracts the code, state, and error parameters.
 *
 * @param url the deep link URL (e.g., "quoll://oauth/callback?code=xxx&state=yyy")
 * @returns the OAuth response parameters
 */
const parseOAuthUrl = (url: string): OAuthResponse | null => {
  try {
    const urlObj = new URL(url);

    // Check if this is an OAuth callback URL
    if (urlObj.protocol !== "quoll:" || !urlObj.pathname.includes("oauth")) {
      return null;
    }

    const code = urlObj.searchParams.get("code") || undefined;
    const state = urlObj.searchParams.get("state") || undefined;
    const error = urlObj.searchParams.get("error") || undefined;

    return { code, state, error };
  } catch (error) {
    console.error("Failed to parse OAuth URL:", error);
    return null;
  }
};

/**
 * Handles an OAuth callback URL by parsing, validating, and calling appropriate callbacks.
 *
 * @param url the deep link URL to handle
 * @param onSuccess called with the authorization code when OAuth succeeds
 * @param onError called with an error message when OAuth fails
 */
const handleOAuthCallback = (
  url: string,
  onSuccess: OnSuccess,
  onError: OnError,
) => {
  const oauthResponse = parseOAuthUrl(url);

  if (!oauthResponse) {
    return; // Not an OAuth callback, ignore
  }

  try {
    const code = validateOAuthResponse(oauthResponse);
    onSuccess(code);
  } catch (error) {
    const message =
      typeof error === "string" ? error : "Authentication failed.";
    onError(message);
  }
};

/**
 * Hook that listens for deep link OAuth callbacks and handles the authentication flow.
 *
 * @param onSuccess called with the authorization code when OAuth succeeds
 * @param onError called with an error message when OAuth fails
 *
 * @example
 * ```tsx
 * useDeepLinkHandler(
 *   (code) => feedsViewModel.authenticate("strava", code),
 *   (error) => console.error(error)
 * );
 * ```
 */
export const useDeepLinkHandler = (onSuccess: OnSuccess, onError: OnError) => {
  useEffect(() => {
    // Handle deep link when app is already open
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleOAuthCallback(url, onSuccess, onError);
    });

    // Handle deep link when app is opened from a closed state
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOAuthCallback(url, onSuccess, onError);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onSuccess, onError]);
};
