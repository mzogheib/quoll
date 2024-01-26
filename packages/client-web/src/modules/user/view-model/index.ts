import { useCallback } from "react";

import { useUserModel } from "../model";
import { useFeedsModel } from "../../feeds/model";

export const useUserViewModel = () => {
  const userModel = useUserModel();
  const feedsModel = useFeedsModel();

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

  return {
    ...userModel,
    login: _login,
  };
};
