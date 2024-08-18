import { AuthUserState, makeAuthUserModel } from "@quoll/client-lib";

import { makeStore } from "@utils/store";
import { useAuthUserService } from "../service";

const defaultState: AuthUserState = {
  user: null,
  isLoading: false,
};

const useStore = makeStore(defaultState);

export const useAuthUserModel = (getAccessToken: () => Promise<string>) => {
  const store = useStore();
  const service = useAuthUserService(getAccessToken);

  return makeAuthUserModel(store, service);
};
