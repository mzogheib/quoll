import { useCallback } from "react";

import { useStore } from "./store";
import userService from "../service";

export const useUserModel = () => {
  const { user, isAuthenticating, setProperty } = useStore();

  const login = useCallback(
    async (userId: string) => {
      setProperty("isAuthenticating", true);
      const user = await userService.login(userId);
      setProperty("user", user);
      setProperty("isAuthenticating", false);

      return user;
    },
    [setProperty],
  );

  const signup = useCallback(async () => {
    setProperty("isAuthenticating", true);
    const user = await userService.signup();
    setProperty("user", user);
    setProperty("isAuthenticating", false);
  }, [setProperty]);

  return {
    user,
    isAuthenticating,
    login,
    signup,
  };
};
