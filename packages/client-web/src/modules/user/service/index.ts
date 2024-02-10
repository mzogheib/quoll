import api from "../../../services/api";
import { User } from "../types";

const login = (userId: string) =>
  api.post<User>({ endpoint: "login", payload: { userId } }).then((user) => {
    return user;
  });

const signup = () =>
  api.post<User>({ endpoint: "signup" }).then((user) => {
    return user;
  });

const userService = { login, signup };

export default userService;
