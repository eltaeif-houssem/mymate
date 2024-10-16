import { RouteObject } from "react-router-dom";

export type MyRouteObject = RouteObject & {
  auth?: boolean;
};
