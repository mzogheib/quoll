import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { User } from "../types";

export type UserState = {
  isAuthenticating: boolean;
  user: User | undefined;
};

type UserStatePropertyName = keyof UserState;

const selectProperty =
  <Name extends UserStatePropertyName>(name: Name) =>
  (state: RootState) =>
    state.user[name];

const makeActionType = (name: UserStatePropertyName) => `user__${name}`;

const makeSetPropertyAction = <Name extends UserStatePropertyName>(
  name: Name,
  value: UserState[Name],
) => ({
  type: makeActionType(name),
  value: value,
});

type SetPropertyAction = ReturnType<typeof makeSetPropertyAction>;

const getActionValue = <Name extends UserStatePropertyName>(
  _: Name,
  action: SetPropertyAction,
) => action.value as UserState[Name];

const defaultState: UserState = { isAuthenticating: true, user: undefined };

const userReducer = (
  state: UserState = defaultState,
  action: SetPropertyAction,
): UserState => {
  switch (action.type) {
    case makeActionType("isAuthenticating"):
      return {
        ...state,
        isAuthenticating: getActionValue("isAuthenticating", action),
      };

    case makeActionType("user"):
      return {
        ...state,
        user: getActionValue("user", action),
      };

    default:
      return state;
  }
};

export default userReducer;

export const useUserStore = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectProperty("user"));
  const isAuthenticating = useSelector(selectProperty("isAuthenticating"));

  const setProperty = useCallback(
    <K extends keyof UserState>(name: K, value: UserState[K]) => {
      dispatch(makeSetPropertyAction(name, value));
    },
    [dispatch],
  );

  return {
    user,
    isAuthenticating,
    setProperty,
  };
};
