import { useCallback } from "react";
import { User } from "@quoll/lib";
import { useUserModel as _useUserModel } from "@quoll/client-lib";

import { makeStorage } from "@utils/storage";
import { makeStore } from "@utils/store";
import { userService } from "../service";

export const storage = makeStorage<{ id: string }>("user");

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
  }, []);

  const signup = useCallback(async () => {
    const user = await model.signup();
  }, []);

  return {
    ...model,
    login,
    signup,
  };
};
