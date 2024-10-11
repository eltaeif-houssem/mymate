import authStore from "@store/auth.store";

export interface IAppContext {
  authStore: typeof authStore;
}
