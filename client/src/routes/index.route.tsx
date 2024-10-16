import { lazy } from "react";
import { MyRouteObject } from "@interfaces/route.interface";

const ErrorPage = lazy(() => import("@pages/ErrorPage"));

export const routes: MyRouteObject[] = [
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
