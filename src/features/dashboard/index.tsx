import type { RouteObject } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import { ROUTES } from "../paths";

const routes: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardScreen />
  }
];

export default routes;
