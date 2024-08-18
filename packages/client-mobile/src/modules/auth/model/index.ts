import { AUTH0_AUDIENCE } from "@env";
import { useAuth0 } from "react-native-auth0";
import { AuthModel } from "@quoll/client-lib";

const makeAuthParams = () => {
  if (!AUTH0_AUDIENCE) throw new Error("Missing Auth0 configuration");

  return {
    audience: AUTH0_AUDIENCE,
    scope: "openid profile read:all_data",
  };
};

export const useAuthModel = (): AuthModel => {
  const {
    user,
    isLoading,
    authorize,
    getCredentials,
    clearCredentials,
    clearSession,
  } = useAuth0();

  const login = async () => {
    await authorize({ ...makeAuthParams() });
  };

  const signup = async () => {
    await authorize({
      ...makeAuthParams(),
      additionalParameters: { screen_hint: "signup" },
    });
  };

  const logout = async () => {
    await clearCredentials();
    await clearSession();
  };

  const getAccessToken = async () => {
    const credentials = await getCredentials();

    if (credentials === undefined) throw new Error("No credentials found");

    return credentials.accessToken;
  };

  return {
    isAuthenticated: user !== null,
    isAuthenticating: isLoading,
    login,
    signup,
    logout,
    getAccessToken,
  };
};
