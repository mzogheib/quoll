import { useCallback } from "react";

import { usePersistedState } from "@utils/persisted-state/logic";
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

const useUserStore = makeStore(defaultState);

export const useUserModel = () => {
  const [userId, setUserId] = usePersistedState<string | undefined>(
    "user::userId",
    undefined,
  );

  const getCurrentUserId = () => userId;

  const { state, setProperty } = useUserStore();
  const { user, isAuthenticating } = state;

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
    setUserId(user.id);
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
