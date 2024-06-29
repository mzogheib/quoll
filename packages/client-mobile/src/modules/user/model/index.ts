import { User } from "@quoll/lib";
import { useUserModel as _useUserModel } from "@quoll/client-lib";

import { makeStorage } from "@utils/storage";
import { makeStore } from "@utils/store";
import { userService } from "../service";

export const storage = makeStorage<{ id: string }>("user");

type State = {
  isAuthenticating: boolean;
  user: User | undefined;
};

const defaultState: State = {
  isAuthenticating: true,
  user: undefined,
};

const useStore = makeStore(defaultState);

export const useUserModel = () => _useUserModel(useStore, userService, storage);
