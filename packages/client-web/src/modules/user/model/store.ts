import { makeReduxStoreSlice } from "@quoll/client-lib";
import { User } from "@quoll/lib";

import { RootState } from "store";

export type State = {
  isAuthenticating: boolean;
  user: User | undefined;
};

const defaultState: State = {
  isAuthenticating: true,
  user: undefined,
};

export const { reducer, useStore } = makeReduxStoreSlice<State, RootState>(
  "user",
  defaultState,
);
