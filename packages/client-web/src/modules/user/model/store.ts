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

export const { reducer, useStore } = makeStore<UserState>("user", defaultState);
