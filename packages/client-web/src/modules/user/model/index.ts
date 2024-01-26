import { useCallback } from "react";

import { useUserStore } from "./store";
import userService from "../service";

export const useUserModel = () => {
  const { user, isAuthenticating, setUserAuthenticating, setUserReady } =
    useUserStore();

  const login = useCallback(
    async (userId: string) => {
      setUserAuthenticating();

      const user = await userService.login(userId);

      setUserReady(user);

      return user;
    },
    [setUserAuthenticating, setUserReady],
  );

  const signup = useCallback(async () => {
    setUserAuthenticating();
    const user = await userService.signup();
    setUserReady(user);
  }, [setUserAuthenticating, setUserReady]);

  return {
    user,
    isAuthenticating,
    login,
    signup,
  };
};
