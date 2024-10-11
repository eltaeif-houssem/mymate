import type { IUser } from "@interfaces/user.interface";

export interface IAuth {
  isLoggedIn: boolean;
  user: IUser | null;
}
