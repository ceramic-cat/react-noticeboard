import type { JSX } from "react";
import { createElement } from "react";
// page components
import CreatePost from "./pages/CreatePost.tsx";
import Login from "./pages/Login.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import RegisterUser from "./pages/RegisterUser.tsx";
import Start from "./pages/Start.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";

interface Route {
  element: JSX.Element;
  path: string;
  loader?: Function;
  menuLabel?: string;
  index?: number;
  parent?: string;
  requiresAuth?: boolean;
  hideWhenAuthed?: boolean;
}

export default [
  CreatePost,
  Login,
  NotFoundPage,
  RegisterUser,
  Start,
  UserDashboard,
]
  // map the route property of each page component to a Route
  .map((x) => ({ element: createElement(x), ...x.route } as Route))
  // sort by index (and if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));
