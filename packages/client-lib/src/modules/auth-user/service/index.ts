import { User } from "@quoll/lib/modules";
import { AuthenticatedHttpService } from "@quoll/lib/services";

export class AuthUserService extends AuthenticatedHttpService {
  async getMe() {
    return this.request<User>({
      method: "GET",
      endpoint: "/user/me",
    });
  }
}
