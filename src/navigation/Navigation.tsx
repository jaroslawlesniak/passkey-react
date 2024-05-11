import React from 'react'
import { createHashRouter,RouteObject, RouterProvider } from 'react-router-dom'

import auth from '@/features/auth';
import dashboard from '@/features/dashboard';
import home from '@/features/home';

const flatten = (routes: RouteObject[][]) => routes.flat();

const router = createHashRouter(flatten([home, auth, dashboard]));

const Navigation: React.FC = () => (
  <RouterProvider router={router} />
);

export default Navigation;
