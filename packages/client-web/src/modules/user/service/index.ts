import api from "../../../services/api";
import { User } from "../types";

const login = async (userId: string) =>
  await api.post<User>({
    endpoint: "login",
    payload: { userId },
  });

const signup = async () => await api.post<User>({ endpoint: "signup" });

const userService = { login, signup };

export default userService;
