import type { RouteObject } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { ROUTES } from "../paths";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomeScreen />
  }
];

export default routes;
