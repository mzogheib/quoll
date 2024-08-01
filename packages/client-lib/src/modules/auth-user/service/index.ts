import { AuthenticatedHttpService, User } from "@quoll/lib";

export class AuthUserService extends AuthenticatedHttpService {
  async getMe() {
    return this.request<User>({
      method: "GET",
      endpoint: "/user/me",
    });
  }
}
