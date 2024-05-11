import type { RouteObject } from "react-router-dom";

import { PATHS } from "@/navigation/paths";

import AuthScreen from "./screens/AuthScreen";

const routes: RouteObject[] = [
  {
    path: PATHS.AUTH,
    element: <AuthScreen />
  }
];

export default routes;
