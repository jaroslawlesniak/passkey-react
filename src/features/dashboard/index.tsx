import type { RouteObject } from 'react-router-dom';

import { PATHS } from '@/navigation/paths';

import DashboardScreen from './screens/DashboardScreen';

const routes: RouteObject[] = [
  {
    path: PATHS.DASHBOARD,
    element: <DashboardScreen />,
  },
];

export default routes;
