import { useAuth0 } from "@auth0/auth0-react";

type AuthState = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
};

type AuthActions = {
  login: () => Promise<void>;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string>;
};

export type AuthModel = AuthState & AuthActions;

export const useAuthModel = (): AuthModel => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const signup = async () =>
    await loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

  return {
    isAuthenticated,
    isAuthenticating: isLoading,
    login: loginWithRedirect,
    signup,
    logout,
    getAccessToken: getAccessTokenSilently,
  };
};
