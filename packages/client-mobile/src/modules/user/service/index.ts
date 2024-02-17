import { User } from "../types";

export const login = async (userId: string): Promise<User> => ({
  id: userId,
});

export const signup = async (): Promise<User> => ({ id: "123-abc" });
