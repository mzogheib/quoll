import {
  UserState,
  useUserModel as _useUserModel,
} from "@quoll/client-lib/modules";

import { makeStorage } from "@utils/storage";
import { makeStore } from "@utils/store";
import { userService } from "../service";

export const storage = makeStorage<{ id: string }>("user");

const defaultState: UserState = {
  isAuthenticating: true,
  user: null,
};

const useStore = makeStore(defaultState);

export const useUserModel = () => _useUserModel(useStore, userService, storage);
