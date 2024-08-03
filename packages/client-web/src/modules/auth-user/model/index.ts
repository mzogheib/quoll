import {
  AuthUserState,
  useAuthUserModel as _useAuthUserModel,
} from "@quoll/client-lib/modules";
import { makeReduxStoreSlice } from "@quoll/client-lib/store";

import { useAuthUserService } from "../service";
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
  const service = useAuthUserService(getAccessToken);

  return _useAuthUserModel(authUserStore.useStore, service);
};
