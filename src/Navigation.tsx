import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import auth from './features/auth';
import redirect from './features/redirect';
import dashboard from './features/dashboard';

const router = createHashRouter([
  ...redirect,
  ...auth,
  ...dashboard,
]);

const Navigation: React.FC = () => (
  <RouterProvider router={router} />
);

export default Navigation