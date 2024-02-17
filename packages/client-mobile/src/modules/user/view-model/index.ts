import { useCallback } from "react";

import { useUserModel } from "../model";

export const useUserViewModel = () => {
  const userModel = useUserModel();

  const { login } = userModel;

  const _login = useCallback(async (userId: string) => {
    await login(userId);
  }, []);

  return {
    ...userModel,
    login: _login,
  };
};
