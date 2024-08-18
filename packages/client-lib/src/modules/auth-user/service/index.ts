import { AuthenticatedHttpService, User } from "@quoll/lib";

export class UserService extends AuthenticatedHttpService {
  async getMe() {
    return this.request<User>({
      method: "GET",
      endpoint: "/user/me",
    });
  }

  async createMe() {
    return this.request<User>({
      method: "POST",
      endpoint: "/user/me",
    });
  }
}
