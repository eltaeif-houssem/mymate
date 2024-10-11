export enum Role {
  ROLE_CLIENT,
  ROLE_ADMIN,
}

export interface IUser {
  id: string;
  email: string;
  role: Role;
}
