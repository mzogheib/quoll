import { User } from "../types";
import { makeStore } from "store/factory";

export type State = {
  isAuthenticating: boolean;
  user: User | undefined;
};

const defaultState: State = {
  isAuthenticating: true,
  user: undefined,
};

export const { reducer, useStore } = makeStore<State>("user", defaultState);
