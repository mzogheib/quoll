import { User } from "@quoll/lib";

import { Store } from "../../../store/types";
import { AuthUserService } from "../service";

export type AuthUserState = {
  isLoading: boolean;
  user: User | null;
};

type AuthUserActions = {
  getMe: () => Promise<User | null>;
  createMe: () => Promise<User>;
  reset: () => void;
};

type AuthUserModel = AuthUserState & AuthUserActions;

export const makeAuthUserModel = (
  store: Store<AuthUserState>,
  service: AuthUserService,
): AuthUserModel => {
  const { state, setProperty, reset } = store;
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

  const createMe = async () => {
    try {
      setProperty("isLoading", true);
      const user = await service.createMe();
      setProperty("user", user);
      return user;
    } catch (error) {
      throw error;
    } finally {
      setProperty("isLoading", false);
    }
  };

  return {
    user,
    isLoading,
    getMe,
    createMe,
    reset,
  };
};
