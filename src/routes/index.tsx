import {
  HomePage,
  JoinPage,
  LoginPage,
  ProfilePage,
  RoomPage,
  SignupPage,
} from "../components";

const homeRoutes = {
  path: "/",
  element: <HomePage />,
};

const profilRoutes = {
  path: "/profile",
  element: <ProfilePage />,
};

const roomRoutes = {
  path: "/room/:id",
  element: <RoomPage />,
};

const joinRoutes = {
  path: "/join",
  element: <JoinPage />,
};

const signUpRoutes = {
  path: "/signup",
  element: <SignupPage />,
};

const loginRoutes = {
  path: "/login",
  element: <LoginPage />,
};

export const routes = [
  homeRoutes,
  profilRoutes,
  roomRoutes,
  joinRoutes,
  signUpRoutes,
  loginRoutes,
];
