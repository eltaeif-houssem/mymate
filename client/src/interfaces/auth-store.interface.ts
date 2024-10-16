import { IUser } from "./user.interface";

export interface IAuthSate {
  isLoggedIn: boolean;
  user: IUser | null;
}
