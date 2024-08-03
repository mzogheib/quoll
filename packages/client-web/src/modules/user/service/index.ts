import { UserService } from "@quoll/client-lib";

export const userService = new UserService(`${process.env.REACT_APP_API_URL}`);
