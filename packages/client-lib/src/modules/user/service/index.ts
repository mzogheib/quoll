import { User } from "@quoll/lib/modules";
import { AuthenticatedHttpService } from "@quoll/lib/services";

export interface IUserService {
  getMe: () => Promise<User>;
  createMe: () => Promise<User>;
}

export class UserService
  extends AuthenticatedHttpService
  implements IUserService
{
  async getMe() {
    return this.request<User>({
      method: "GET",
      endpoint: "/users/me",
    });
  }

  async createMe() {
    return this.request<User>({
      method: "POST",
      endpoint: "/users/me",
    });
  }
}
