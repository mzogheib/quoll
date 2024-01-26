import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const { reducer, selectProperty, makeSetPropertyAction } = makeStore<UserState>(
  "user",
  defaultState,
);

export default reducer;

export const useUserStore = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectProperty("user"));
  const isAuthenticating = useSelector(selectProperty("isAuthenticating"));

  const setProperty = useCallback(
    <PropertyName extends keyof UserState>(
      name: PropertyName,
      value: UserState[PropertyName],
    ) => {
      const action = makeSetPropertyAction(name, value);
      dispatch(action);
    },
    [dispatch],
  );

  return {
    user,
    isAuthenticating,
    setProperty,
  };
};
