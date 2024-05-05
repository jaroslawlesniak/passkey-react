import type { RouteObject } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen";
import { PATHS } from "@/navigation/paths";

const routes: RouteObject[] = [
  {
    path: PATHS.AUTH,
    element: <AuthScreen />
  }
];

export default routes;
