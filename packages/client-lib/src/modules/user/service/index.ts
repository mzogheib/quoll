import { User } from "@quoll/lib";

export type UserService = {
  login: (userId: string) => Promise<User>;
  signup: () => Promise<User>;
};
