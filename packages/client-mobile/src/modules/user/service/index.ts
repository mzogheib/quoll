import { User } from "@quoll/lib";
import { apiService } from "@utils/api";

export const login = async (userId: string) =>
  await apiService.request<User>({
    method: "POST",
    endpoint: "/login",
    payload: { userId },
  });

export const signup = async () =>
  await apiService.request<User>({
    method: "POST",
    endpoint: "/signup",
  });
