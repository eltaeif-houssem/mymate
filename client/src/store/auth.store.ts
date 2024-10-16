import { makeAutoObservable } from "mobx";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  authenticate() {}
}

export const authStore = new AuthStore();
export default authStore;
