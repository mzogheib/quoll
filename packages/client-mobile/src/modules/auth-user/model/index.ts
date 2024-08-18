import { UserState, makeUserModel } from "@quoll/client-lib";

import { makeStore } from "@utils/store";
import { useUserService } from "../service";

const defaultState: UserState = {
  user: null,
  isLoading: false,
};

const useStore = makeStore(defaultState);

export const useUserModel = (getAccessToken: () => Promise<string>) => {
  const store = useStore();
  const service = useUserService(getAccessToken);

  return makeUserModel(store, service);
};
