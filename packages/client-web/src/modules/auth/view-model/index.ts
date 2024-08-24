import { AuthModel } from "@quoll/client-lib/modules";
import { useAuthModel } from "../model";
import { useTimelineModel } from "modules/timeline/model";
import { useFeedsModel } from "modules/feeds/model";
import { useDateModel } from "modules/date/model";
import { useUserModel } from "modules/user/model";
import { useEffect, useState } from "react";

type AuthViewModel = AuthModel;

export const useAuthViewModel = (): AuthViewModel => {
  const { getAccessToken } = useAuthModel();

  const authModel = useAuthModel();
  const timelineModel = useTimelineModel(getAccessToken);
  const feedsModel = useFeedsModel(getAccessToken);
  const dateModel = useDateModel();
  const userModel = useUserModel(getAccessToken);

  const _logout = async () => {
    timelineModel.reset();
    feedsModel.reset();
    dateModel.reset();
    userModel.reset();

    return await authModel.logout();
  };

  return {
    ...authModel,
    logout: _logout,
  };
};

export const useCheckAuthOnce = (
  onAuthenticated: () => void,
  onUnauthenticated: () => void,
) => {
  const { isAuthenticated, isAuthenticating } = useAuthModel();

  const [didCheckAuth, setDidCheckAuth] = useState(false);

  useEffect(() => {
    if (isAuthenticating || didCheckAuth) return;

    setDidCheckAuth(true);

    if (isAuthenticated) {
      onAuthenticated();
    } else {
      onUnauthenticated();
    }
  }, [
    didCheckAuth,
    isAuthenticated,
    isAuthenticating,
    onAuthenticated,
    onUnauthenticated,
  ]);
};
