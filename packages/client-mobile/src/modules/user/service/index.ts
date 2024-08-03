import { UserService } from "@quoll/client-lib";
import { API_URL } from "@env";

export const userService = new UserService(API_URL);
