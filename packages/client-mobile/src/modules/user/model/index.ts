import { useCallback } from "react";
import { apiService } from "@quoll/client-lib";

import { makeStorage } from "@utils/storage";
import { makeStore } from "@utils/store";
import { User } from "../types";
import * as userService from "../service";

type State = {
  isAuthenticating: boolean;
  user: User | undefined;
};

const defaultState: State = {
  isAuthenticating: true,
  user: undefined,
};

const useStore = makeStore(defaultState);

type StoredState = {
  id: string | undefined;
};

const defaultStoredState: StoredState = {
  id: undefined,
};

const useStorage = makeStorage("user", defaultStoredState);

export const useUserModel = () => {
  const storage = useStorage();

  const getCurrentUserId = () => storage.state.id;

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
