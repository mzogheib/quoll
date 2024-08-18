import { useAuth0 } from "@auth0/auth0-react";
import { AuthModel } from "@quoll/client-lib";

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
