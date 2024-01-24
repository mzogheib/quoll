import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { loginUser, signupUser } from "../model/store";

export const useUserModel = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    async (userId: string) => {
      dispatch(loginUser(userId));
    },
    [dispatch],
  );

  const signup = useCallback(async () => {
    dispatch(signupUser());
  }, [dispatch]);

  return {
    login,
    signup,
  };
};
