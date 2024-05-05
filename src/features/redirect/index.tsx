import type { RouteObject } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { PATHS } from '@/navigation/paths';

const routes: RouteObject[] = [
  {
    path: PATHS.HOME,
    element: <HomeScreen />
  }
];

export default routes;
