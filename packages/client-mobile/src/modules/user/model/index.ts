import { useCallback } from "react";

import { makeStorage } from "@utils/storage";
import { makeStore } from "@utils/store";
import { apiService } from "@utils/api";
import { User } from "../types";
import * as userService from "../service";

const storage = makeStorage<{ id: string }>("user");

const getCurrentUserId = () => storage.getData()?.id;

type State = {
  isAuthenticating: boolean;
  user: User | undefined;
};

const defaultState: State = {
  isAuthenticating: true,
  user: undefined,
};

const useStore = makeStore(defaultState);

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
    apiService.authenticate(user._id);
    storage.setProperty("id", user._id);
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
