import * as authApi from "@api/auth.api";
import {
  ISignup,
  ISignin,
  IResetPassword,
  IAuthResp,
} from "@interfaces/auth.interface";

class AuthService {
  async signup(body: ISignup): Promise<IAuthResp | any> {
    try {
      const { data } = await authApi.signup(body);
      return data as IAuthResp;
    } catch (error: any) {
      return { error: `${error.response.data.message}` };
    }
  }

  async signin(body: ISignin): Promise<IAuthResp | any> {
    try {
      const { data } = await authApi.signin(body);
      return data;
    } catch (error: any) {
      return { error: `${error.response.data.message}` };
    }
  }

  async verifyToken(
    access_token: string,
    refresh_token: string
  ): Promise<IAuthResp | any> {
    try {
      const { data } = await authApi.verifyToken(access_token, refresh_token);
      return data;
    } catch (error: any) {
      return { error: `${error.response.data.message}` };
    }
  }

  async resetPassword(body: IResetPassword): Promise<IAuthResp | any> {
    try {
      const { data } = await authApi.resetPassword(body);
      return data;
    } catch (error: any) {
      return { error: `${error.response.data.message}` };
    }
  }
}

export const authService = new AuthService();
export default authService;
