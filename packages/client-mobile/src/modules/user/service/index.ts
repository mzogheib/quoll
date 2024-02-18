import { apiService } from "@quoll/client-lib";
import { User } from "../types";

export const login = async (userId: string) =>
  await apiService.post<User>({
    endpoint: "login",
    payload: { userId },
  });

export const signup = async () =>
  await apiService.post<User>({ endpoint: "signup" });
