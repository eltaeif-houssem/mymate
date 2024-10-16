import * as authApi from "@api/auth.api";
import { ISignup, ISignin, IResetPassword } from "@interfaces/auth.interface";

class AuthService {
  async signup(body: ISignup) {
    try {
      const { data } = await authApi.signup(body);
      return data;
    } catch (error: any) {
      return { error: `${error.message}` };
    }
  }

  async signin(body: ISignin) {
    try {
      const { data } = await authApi.signin(body);
      return data;
    } catch (error: any) {
      return { error: `${error.message}` };
    }
  }

  async verifyToken() {
    try {
    } catch (error) {}
  }

  async resetPassword() {
    try {
    } catch (error) {}
  }
}

export const authService = new AuthService();
export default authService;
