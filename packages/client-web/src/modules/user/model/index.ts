import { useCallback } from "react";
import {
  UserState,
  useUserModel as _useUserModel,
  makeReduxStoreSlice,
} from "@quoll/client-lib";

import { makeStorage } from "services/storage";
import { userService } from "../service";
import { RootState } from "store";

export const storage = makeStorage<{ id: string }>("user");

const defaultState: UserState = {
  isAuthenticating: true,
  user: null,
};

export const userStore = makeReduxStoreSlice<UserState, RootState>(
  "user",
  defaultState,
);

export const useUserModel = () => {
  const model = _useUserModel(userStore.useStore, userService, storage);

  const login = useCallback(
    async (userId: string) => {
      const user = await model.login(userId);

      return user;
    },
    [model],
  );

  const signup = useCallback(async () => {
    await model.signup();
  }, [model]);

  return {
    ...model,
    login,
    signup,
  };
};
