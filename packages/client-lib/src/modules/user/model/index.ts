import { User } from "@quoll/lib";

import { Store } from "../../../store/types";
import { Storage } from "../../../storage/types";
import { UserService } from "../service";

export type UserState = {
  isAuthenticating: boolean;
  user: User | null;
};

type UserActions = {
  login: (userId: string) => Promise<User>;
  signup: () => Promise<User>;
  logout: () => Promise<void>;
  getCurrentUserId: () => string | undefined;
  reset: () => void;
};

type UserModel = UserState & UserActions;

export const useUserModel = (
  useStore: () => Store<UserState>,
  service: UserService,
  storage: Storage<{ id: string }>,
): UserModel => {
  const { state, setProperty, reset } = useStore();
  const { user, isAuthenticating } = state;

  const login = async (userId: string) => {
    setProperty("isAuthenticating", true);
    const user = await service.login(userId);
    storage.setProperty("id", userId);
    setProperty("user", user);
    setProperty("isAuthenticating", false);

    return user;
  };

  const signup = async () => {
    setProperty("isAuthenticating", true);
    const user = await service.signup();
    storage.setProperty("id", user._id);
    setProperty("user", user);
    setProperty("isAuthenticating", false);

    return user;
  };

  const getCurrentUserId = () => storage.getData()?.id;

  const logout = async () => {
    setProperty("isAuthenticating", true);
    storage.clear();
    setProperty("user", null);
    setProperty("isAuthenticating", false);
  };

  return {
    user,
    isAuthenticating,
    getCurrentUserId,
    login,
    signup,
    logout,
    reset,
  };
};
