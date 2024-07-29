import { useAuth0 } from "@auth0/auth0-react";

import { useTimelineModel } from "modules/timeline/model";
import { useFeedsModel } from "modules/feeds/model";
import { useDateModel } from "modules/date/model";
import { useUserModel } from "modules/user/model";

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

type AuthViewModel = AuthState & AuthActions;

export const useAuthViewModel = (): AuthViewModel => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const timelineModel = useTimelineModel();
  const feedsModel = useFeedsModel();
  const dateModel = useDateModel();
  const userModel = useUserModel();

  const signup = async () =>
    await loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

  const _logout = async () => {
    timelineModel.reset();
    feedsModel.reset();
    dateModel.reset();
    userModel.reset();

    return await logout();
  };

  return {
    isAuthenticated,
    isAuthenticating: isLoading,
    login: loginWithRedirect,
    signup,
    logout: _logout,
    getAccessToken: getAccessTokenSilently,
  };
};
