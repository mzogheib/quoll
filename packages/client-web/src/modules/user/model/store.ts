import { makeStore } from "@quoll/client-lib";

import { RootState } from "store";
import { User } from "../types";

export type State = {
  isAuthenticating: boolean;
  user: User | undefined;
};

const defaultState: State = {
  isAuthenticating: true,
  user: undefined,
};

export const { reducer, useStore } = makeStore<State, RootState>(
  "user",
  defaultState,
);
