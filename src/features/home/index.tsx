import type { RouteObject } from "react-router-dom";

import { PATHS } from '@/navigation/paths';

import HomeScreen from "./screens/HomeScreen";

const routes: RouteObject[] = [
  {
    path: PATHS.HOME,
    element: <HomeScreen />
  }
];

export default routes;
