import { Request } from "express";

export interface IUser {
  id: string;
  email: string;
}

export interface IUserReq extends Request {
  user?: IUser;
}
