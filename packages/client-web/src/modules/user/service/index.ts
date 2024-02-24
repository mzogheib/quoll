import { User } from "@quoll/lib";
import { apiService } from "services/api";

const login = async (userId: string) =>
  await apiService.request<User>({
    method: "POST",
    endpoint: "/login",
    payload: { userId },
  });

const signup = async () =>
  await apiService.request<User>({
    method: "POST",
    endpoint: "/signup",
  });

const userService = { login, signup };

export default userService;
