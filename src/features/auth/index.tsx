import type { RouteObject } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen";
import { ROUTES } from "../paths";

const routes: RouteObject[] = [
  {
    path: ROUTES.AUTH,
    element: <AuthScreen />
  }
];

export default routes;
