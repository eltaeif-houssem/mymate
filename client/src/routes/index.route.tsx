import { lazy } from "react";
import * as routePaths from "@constants/route-urls.constant";
import { RouteObject } from "react-router-dom";

// Define pages
const SigninPage = lazy(() => import("@pages/auth/Signin"));
const SignupPage = lazy(() => import("@pages/auth/Signup"));
const ResetPasswordPage = lazy(() => import("@pages/auth/ResetPassword"));

const HomePage = lazy(() => import("@pages/home/Home"));

const ProfilePage = lazy(() => import("@pages/user/Profile"));
const ProfileDetailsPage = lazy(() => import("@pages/user/ProfileDetails"));
const FriendsPage = lazy(() => import("@pages/user/Friends"));
const SettingsPage = lazy(() => import("@pages/user/Settings"));
const MessagesPage = lazy(() => import("@pages/user/Messages"));
const NotificationsPage = lazy(() => import("@pages/user/Notifications"));

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
    element: <ProfilePage />,
  },

  {
    path: routePaths.USER_FRIENDS,
    element: <FriendsPage />,
  },

  {
    path: routePaths.USER_PROFILE_DETAILS,
    element: <ProfileDetailsPage />,
  },

  {
    path: routePaths.USER_SETTINGS,
    element: <SettingsPage />,
  },

  {
    path: routePaths.USER_MESSAGES,
    element: <MessagesPage />,
  },

  {
    path: routePaths.USER_NOTIFICATIONS,
    element: <NotificationsPage />,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
