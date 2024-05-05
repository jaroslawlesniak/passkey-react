import React from 'react'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'

import auth from '@/features/auth';
import home from '@/features/home';
import dashboard from '@/features/dashboard';

const flatten = (routes: RouteObject[][]) => routes.flat();

const router = createHashRouter(flatten([home, auth, dashboard]));

const Navigation: React.FC = () => (
  <RouterProvider router={router} />
);

export default Navigation;
