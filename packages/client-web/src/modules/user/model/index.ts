import { useCallback } from "react";
import { useUserModel as _useUserModel } from "@quoll/client-lib";

import { apiService } from "services/api";
import { makeStorage } from "services/storage";
import { useStore } from "./store";
import userService from "../service";

const storage = makeStorage<{ id: string }>("user");

export const useUserModel = () => {
  const model = _useUserModel(useStore, userService, storage);

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
