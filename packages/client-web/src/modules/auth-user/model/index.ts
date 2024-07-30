import {
  AuthUserService,
  AuthUserState,
  useAuthUserModel as _useAuthUserModel,
  makeReduxStoreSlice,
} from "@quoll/client-lib";
import { useMemo } from "react";

import { RootState } from "store";

const defaultState: AuthUserState = {
  user: null,
  isLoading: false,
};

export const authUserStore = makeReduxStoreSlice<AuthUserState, RootState>(
  "authUser",
  defaultState,
);

export const useAuthUserModel = (getAccessToken: () => Promise<string>) => {
  const service = useMemo(() => {
    if (process.env.REACT_APP_API_URL === undefined) {
      throw new Error("REACT_APP_API_URL is not defined");
    }

    return new AuthUserService(getAccessToken, process.env.REACT_APP_API_URL);
  }, [getAccessToken]);

  return _useAuthUserModel(authUserStore.useStore, service);
};
