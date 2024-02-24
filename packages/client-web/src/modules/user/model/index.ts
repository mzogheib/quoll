import { useCallback } from "react";

import { apiService } from "services/api";
import { makeStorage } from "services/storage";
import { useStore } from "./store";
import userService from "../service";

const storage = makeStorage<{ id: string }>("user");

const getCurrentUserId = () => storage.getData()?.id;

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
    storage.setProperty("id", user._id);
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
