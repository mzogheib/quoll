import { UserService } from "@quoll/client-lib/modules";
import { API_URL } from "@env";

export const userService = new UserService(API_URL);
