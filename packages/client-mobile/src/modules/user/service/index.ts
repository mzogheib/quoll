import api from "@utils/api";
import { User } from "../types";

export const login = async (userId: string) =>
  await api.post<User>({
    endpoint: "login",
    payload: { userId },
  });

export const signup = async () => await api.post<User>({ endpoint: "signup" });
