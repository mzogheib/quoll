import { User } from "../types";
import { makeStore } from "store/factory";

export type UserState = {
  isAuthenticating: boolean;
  user: User | undefined;
};

const defaultState: UserState = {
  isAuthenticating: true,
  user: undefined,
};

const { reducer, useSelectProperty, useSetProperty } = makeStore<UserState>(
  "user",
  defaultState,
);

export default reducer;

export const useUserStore = () => {
  const setProperty = useSetProperty();
  const user = useSelectProperty("user");
  const isAuthenticating = useSelectProperty("isAuthenticating");

  return {
    user,
    isAuthenticating,
    setProperty,
  };
};
