import { UserState, makeUserModel } from "@quoll/client-lib/modules";
import { makeReduxStoreSlice } from "@quoll/client-lib/store";

import { useUserService } from "../service";
import { RootState } from "store";

const defaultState: UserState = {
  user: null,
  isLoading: false,
};

export const userStore = makeReduxStoreSlice<UserState, RootState>(
  "user",
  defaultState,
);

export const useUserModel = (getAccessToken: () => Promise<string>) => {
  const store = userStore.useStore();
  const service = useUserService(getAccessToken);

  return makeUserModel(store, service);
};
