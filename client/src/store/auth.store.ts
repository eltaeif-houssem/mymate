import { makeAutoObservable } from "mobx";
import { IAuth } from "@interfaces/authStore.interface";

class AuthStore {
  auth: IAuth = {
    isLoggedIn: false,
    user: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async signup() {}

  async signin() {}

  async signout() {
    localStorage.removeItem("access_token");
    this.auth = {
      isLoggedIn: false,
      user: null,
    };
  }
}

export const authStore = new AuthStore();
export default authStore;
