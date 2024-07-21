import { HttpService, User } from "@quoll/lib";

export class UserService extends HttpService {
  async login(userId: string) {
    return this.request<User>({
      method: "POST",
      endpoint: "/login",
      payload: { userId },
    });
  }

  async signup() {
    return await this.request<User>({
      method: "POST",
      endpoint: "/signup",
    });
  }
}
