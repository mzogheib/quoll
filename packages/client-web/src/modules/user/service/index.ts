import { apiService } from "services/api";
import { User } from "../types";

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
