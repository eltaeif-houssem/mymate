import { lazy } from "react";
import { MyRouteObject } from "@interfaces/route.interface";
import * as routePaths from "@constants/route-urls.constant";

// Define pages
const SigninPage = lazy(() => import("@pages/auth/Signin"));
const SignupPage = lazy(() => import("@pages/auth/Signup"));
const ResetPasswordPage = lazy(() => import("@pages/auth/ResetPassword"));

const ErrorPage = lazy(() => import("@pages/ErrorPage"));

export const routes: MyRouteObject[] = [
  {
    path: "/",
    element: <p>Home</p>,
    auth: true,
  },

  {
    path: routePaths.AUTH_SIGNIN,
    element: <SigninPage />,
    auth: false,
  },

  {
    path: routePaths.AUTH_SIGNUP,
    element: <SignupPage />,
    auth: false,
  },

  {
    path: routePaths.AUTH_RESET_PASSWORD,
    element: <ResetPasswordPage />,
    auth: false,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
