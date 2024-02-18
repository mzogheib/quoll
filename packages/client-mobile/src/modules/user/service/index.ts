import { User } from "../types";

export const login = async (userId: string): Promise<User> => ({
  _id: userId,
});

export const signup = async (): Promise<User> => ({ _id: "123-abc" });
