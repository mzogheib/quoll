import { UserService } from "@quoll/client-lib";
import { getApiBaseUrl } from "@utils/api";

export const userService = new UserService(getApiBaseUrl());
