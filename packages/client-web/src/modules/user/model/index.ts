import {
  UserState,
  useUserModel as _useUserModel,
  makeReduxStoreSlice,
} from "@quoll/client-lib";

import { makeStorage } from "services/storage";
import { userService } from "../service";
import { RootState } from "store";

export const storage = makeStorage<{ id: string }>("user");

const defaultState: UserState = {
  isAuthenticating: true,
  user: null,
};

export const userStore = makeReduxStoreSlice<UserState, RootState>(
  "user",
  defaultState,
);

export const useUserModel = () =>
  _useUserModel(userStore.useStore, userService, storage);
