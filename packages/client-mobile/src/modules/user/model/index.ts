import { useCallback } from "react";
import { User } from "@quoll/lib";
import { useUserModel as _useUserModel } from "@quoll/client-lib";

import { makeStorage } from "@utils/storage";
import { makeStore } from "@utils/store";
import { apiService } from "@utils/api";
import * as userService from "../service";

const storage = makeStorage<{ id: string }>("user");

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
  const model = _useUserModel(useStore, userService, storage);

  const login = useCallback(async (userId: string) => {
    const user = await model.login(userId);
    apiService.authenticate(user._id);
  }, []);

  const signup = useCallback(async () => {
    const user = await model.signup();
    apiService.authenticate(user._id);
  }, []);

  return {
    ...model,
    login,
    signup,
  };
};
