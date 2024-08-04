import { useCallback } from "react";

import { useUserModel } from "../model";
import { useFeedsModel } from "modules/feeds/model";
import { useTimelineModel } from "modules/timeline/model";
import { useDateModel } from "modules/date/model";
import { getAccessToken } from "services/session";

export const useUserViewModel = () => {
  const userModel = useUserModel();
  const feedsModel = useFeedsModel(getAccessToken);
  const timelineModel = useTimelineModel(getAccessToken);
  const dateModel = useDateModel();

  const { login } = userModel;
  const { setConnected } = feedsModel;

  const _login = useCallback(
    async (userId: string) => {
      const user = await login(userId);

      user.feeds.forEach(({ name, isConnected }) => {
        setConnected(name, isConnected);
      });
    },
    [login, setConnected],
  );

  const _logout = useCallback(async () => {
    timelineModel.reset();
    feedsModel.reset();
    dateModel.reset();
    userModel.reset();
    await userModel.logout();
  }, [dateModel, feedsModel, timelineModel, userModel]);

  return {
    ...userModel,
    login: _login,
    logout: _logout,
  };
};
