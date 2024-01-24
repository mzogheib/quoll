import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setUserAuthenticating, setUserReady } from "../model/store";
import userService from "../../../services/user";
import { setFeedConnected } from "../../feeds/model/store";

// TODO remove dependence on feeds model. Setting connected feeds should
// be done at a higher level

export const useUserModel = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    async (userId: string) => {
      dispatch(setUserAuthenticating());

      const user = await userService.login(userId);
      user.feeds.forEach(({ name, isConnected }) =>
        dispatch(setFeedConnected(name, isConnected)),
      );

      dispatch(setUserReady(user));
    },
    [dispatch],
  );

  const signup = useCallback(async () => {
    dispatch(setUserAuthenticating());
    const user = await userService.signup();
    dispatch(setUserReady(user));
  }, [dispatch]);

  return {
    login,
    signup,
  };
};
