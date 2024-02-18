import { apiService } from "services/api";
import { User } from "../types";

const login = async (userId: string) =>
  await apiService.post<User>({
    endpoint: "login",
    payload: { userId },
  });

const signup = async () => await apiService.post<User>({ endpoint: "signup" });

const userService = { login, signup };

export default userService;
