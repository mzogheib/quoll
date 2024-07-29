import { User } from "@quoll/lib";

import { Store } from "../../../store/types";
import { AuthUserService } from "../service";

export type AuthUserState = {
  isLoading: boolean;
  user: User | null;
};

type AuthUserActions = {
  getMe: () => Promise<User>;
  reset: () => void;
};

type AuthUserModel = AuthUserState & AuthUserActions;

export const useAuthUserModel = (
  useStore: () => Store<AuthUserState>,
  service: AuthUserService,
): AuthUserModel => {
  const { state, setProperty, reset } = useStore();
  const { user, isLoading } = state;

  const getMe = async () => {
    setProperty("isLoading", true);
    const user = await service.getMe();
    setProperty("user", user);
    setProperty("isLoading", false);

    return user;
  };

  return {
    user,
    isLoading,
    getMe,
    reset,
  };
};
