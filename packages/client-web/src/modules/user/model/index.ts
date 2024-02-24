import { useCallback } from "react";
import {
  UserState,
  useUserModel as _useUserModel,
  makeReduxStoreSlice,
} from "@quoll/client-lib";

import { apiService } from "services/api";
import { makeStorage } from "services/storage";
import userService from "../service";
import { RootState } from "store";

const storage = makeStorage<{ id: string }>("user");

const defaultState: UserState = {
  isAuthenticating: true,
  user: undefined,
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
      apiService.authenticate(user._id);

      return user;
    },
    [model],
  );

  const signup = useCallback(async () => {
    const user = await model.signup();
    apiService.authenticate(user._id);
  }, [model]);

  return {
    ...model,
    login,
    signup,
  };
};
