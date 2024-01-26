import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectIsAuthenticating,
  selectUser,
  setUserAuthenticating,
  setUserReady,
} from "../model/store";
import userService from "../service";

export const useUserModel = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const isAuthenticating = useSelector(selectIsAuthenticating);

  const login = useCallback(
    async (userId: string) => {
      dispatch(setUserAuthenticating());

      const user = await userService.login(userId);

      dispatch(setUserReady(user));

      return user;
    },
    [dispatch],
  );

  const signup = useCallback(async () => {
    dispatch(setUserAuthenticating());
    const user = await userService.signup();
    dispatch(setUserReady(user));
  }, [dispatch]);

  return {
    user,
    isAuthenticating,
    login,
    signup,
  };
};
