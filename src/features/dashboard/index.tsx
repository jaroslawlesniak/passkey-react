import type { RouteObject } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import { PATHS } from '@/navigation/paths';

const routes: RouteObject[] = [
  {
    path: PATHS.DASHBOARD,
    element: <DashboardScreen />
  }
];

export default routes;
