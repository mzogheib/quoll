import { User } from "@quoll/lib/modules";
import { HttpService } from "@quoll/lib/services";

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
