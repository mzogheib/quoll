import { useAuth0 } from "react-native-auth0";

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
    user,
    isLoading,
    authorize,
    getCredentials,
    clearCredentials,
    clearSession,
  } = useAuth0();

  const login = async () => {
    await authorize();
  };

  const signup = async () => {
    await authorize({ additionalParameters: { screen_hint: "signup" } });
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
