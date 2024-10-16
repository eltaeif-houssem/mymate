import { makeAutoObservable } from "mobx";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export const authStore = new AuthStore();
export default authStore;
