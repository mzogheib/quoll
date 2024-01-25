import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectUser,
  setUserAuthenticating,
  setUserReady,
} from "../model/store";
import userService from "../../../services/user";

export const useUserModel = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

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
    login,
    signup,
  };
};
