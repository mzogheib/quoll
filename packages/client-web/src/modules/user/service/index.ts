import api from "../../../services/api";
import storage from "../../../services/storage";
import { User } from "../types";

const userKey = "user";

const getCurrentUser = () => storage.get(userKey);

const setCurrentUser = (userId: string) => {
  storage.set(userKey, userId);
  api.authenticate(userId);
};

const login = (userId: string) =>
  api.post<User>({ endpoint: "login", payload: { userId } }).then((user) => {
    setCurrentUser(user._id);
    return user;
  });

const signup = () =>
  api.post<User>({ endpoint: "signup" }).then((user) => {
    setCurrentUser(user._id);
    return user;
  });

const userService = { getCurrentUser, login, signup };

export default userService;
