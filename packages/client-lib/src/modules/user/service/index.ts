import { User } from "@quoll/lib";
import { ApiService } from "../../../utils";

export class UserService extends ApiService {
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
