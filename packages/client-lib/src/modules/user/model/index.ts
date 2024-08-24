import { User } from "@quoll/lib/modules";

import { Store } from "../../../store/types";
import { UserService } from "../service";

export type UserState = {
  isLoading: boolean;
  user: User | null;
};

type UserActions = {
  getMe: () => Promise<User | null>;
  createMe: () => Promise<User>;
  reset: () => void;
};

type UserModel = UserState & UserActions;

export const makeUserModel = (
  store: Store<UserState>,
  service: UserService,
): UserModel => {
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
