import { User } from "@quoll/lib/modules";
import { AuthenticatedHttpService } from "@quoll/lib/services";

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
