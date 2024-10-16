import { makeAutoObservable } from "mobx";
import { IAuthResp } from "@interfaces/auth.interface";
import { IAuthSate } from "@interfaces/auth-store.interface";

class AuthStore {
  public auth: IAuthSate = {
    isLoggedIn: false,
    user: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  authenticate(payload: IAuthResp) {
    localStorage.setItem("access_token", payload.access_token);
    localStorage.setItem("refresh_token", payload.refresh_token);
    this.auth = {
      isLoggedIn: true,
      user: payload.data,
    };
  }
}

export const authStore = new AuthStore();
export default authStore;
