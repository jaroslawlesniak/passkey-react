import React from 'react'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'

import auth from '@/features/auth';
import home from '@/features/home';
import dashboard from '@/features/dashboard';

const toFlatRoutes = (routes: RouteObject[][]) => routes.flat();

const router = createHashRouter(toFlatRoutes([home, auth, dashboard]));

const Navigation: React.FC = () => (
  <RouterProvider router={router} />
);

export default Navigation;
