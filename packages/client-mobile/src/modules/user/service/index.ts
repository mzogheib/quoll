import { apiService } from "@utils/api";
import { User } from "../types";

export const login = async (userId: string) =>
  await apiService.request<User>({
    method: "POST",
    endpoint: "login",
    payload: { userId },
  });

export const signup = async () =>
  await apiService.request<User>({
    method: "POST",
    endpoint: "signup",
  });
