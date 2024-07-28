import { useAuth0 } from "@auth0/auth0-react";

type AuthState = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
};

type AuthActions = {
  login: () => Promise<void>;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
};

type AuthViewModel = AuthState & AuthActions;

export const useAuthViewModel = (): AuthViewModel => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const signup = async () =>
    loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

  return {
    isAuthenticated,
    isAuthenticating: isLoading,
    login: loginWithRedirect,
    signup,
    logout,
  };
};
