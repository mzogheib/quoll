import { useCallback } from "react";

import { apiService } from "services/api";
import storage from "services/storage";
import { useStore } from "./store";
import userService from "../service";

const userKey = "user";

const getCurrentUserId = () => storage.get(userKey);

const setCurrentUser = (userId: string) => {
  storage.set(userKey, userId);
};

export const useUserModel = () => {
  const { state, setProperty } = useStore();
  const { user, isAuthenticating } = state;

  const login = useCallback(
    async (userId: string) => {
      setProperty("isAuthenticating", true);
      const user = await userService.login(userId);
      apiService.authenticate(userId);
      setProperty("user", user);
      setProperty("isAuthenticating", false);

      return user;
    },
    [setProperty],
  );

  const signup = useCallback(async () => {
    setProperty("isAuthenticating", true);
    const user = await userService.signup();
    setCurrentUser(user._id);
    apiService.authenticate(user._id);
    setProperty("user", user);
    setProperty("isAuthenticating", false);
  }, [setProperty]);

  return {
    user,
    isAuthenticating,
    getCurrentUserId,
    login,
    signup,
  };
};
