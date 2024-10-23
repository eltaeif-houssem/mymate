import { lazy } from "react";
import * as routePaths from "@constants/route-urls.constant";
import { RouteObject } from "react-router-dom";

// Define pages
const SigninPage = lazy(() => import("@pages/auth/Signin"));
const SignupPage = lazy(() => import("@pages/auth/Signup"));
const ResetPasswordPage = lazy(() => import("@pages/auth/ResetPassword"));

const HomePage = lazy(() => import("@pages/home/Home"));

const ErrorPage = lazy(() => import("@pages/ErrorPage"));

export const routes: RouteObject[] = [
  {
    path: routePaths.HOME,
    element: <HomePage />,
  },

  {
    path: routePaths.AUTH_SIGNIN,
    element: <SigninPage />,
  },

  {
    path: routePaths.AUTH_SIGNUP,
    element: <SignupPage />,
  },

  {
    path: routePaths.AUTH_RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },

  {
    path: routePaths.USER_PROFILE,
    element: <p>Profile</p>,
  },

  {
    path: routePaths.USER_FRIENDS,
    element: <p>FRIENDS</p>,
  },

  {
    path: routePaths.USER_PROFILE_DETAILS,
    element: <p>PROFILE DETAILS</p>,
  },

  {
    path: routePaths.USER_SETTINGS,
    element: <p>Settings</p>,
  },

  {
    path: routePaths.USER_MESSAGES,
    element: <p>Messages</p>,
  },

  {
    path: routePaths.USER_NOTIFICATIONS,
    element: <p>Notifications</p>,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
