import { useAuth0 } from "@auth0/auth0-react";

type SessionState = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
};

type SessionActions = {
  login: () => Promise<void>;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
};

type SessionViewModel = SessionState & SessionActions;

export const useSessionViewModel = (): SessionViewModel => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const _signup = async () =>
    loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

  return {
    isAuthenticated,
    isAuthenticating: isLoading,
    login: loginWithRedirect,
    signup: _signup,
    logout,
  };
};
