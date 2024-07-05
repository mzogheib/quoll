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
  getCurrentUserId: () => string | undefined;
};

type UserModel = UserState & UserActions;

export const useUserModel = (
  useStore: () => Store<UserState>,
  service: UserService,
  storage: Storage<{ id: string }>,
): UserModel => {
  const { state, setProperty } = useStore();
  const { user, isAuthenticating } = state;

  const login = async (userId: string) => {
    setProperty("isAuthenticating", true);
    const user = await service.login(userId);
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

  return {
    user,
    isAuthenticating,
    getCurrentUserId,
    login,
    signup,
  };
};
