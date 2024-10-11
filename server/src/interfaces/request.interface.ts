import { Request } from "express";
import { IUser } from "./user.interface";

export interface IUserReq extends Request {
  user?: IUser;
}
