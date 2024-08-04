import { User } from "@quoll/lib";

import { Store } from "../../../store/types";
import { AuthUserService } from "../service";

export type AuthUserState = {
  isLoading: boolean;
  user: User | null;
};

type AuthUserActions = {
  getMe: () => Promise<User | null>;
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
    try {
      setProperty("isLoading", true);
      const user = await service.getMe();
      setProperty("user", user);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);
        if (parsedError.status === 404) return null;
      }

      throw error;
    } finally {
      setProperty("isLoading", false);
    }
  };

  return {
    user,
    isLoading,
    getMe,
    reset,
  };
};
