import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from '@/contexts/auth';
import { Navigation } from '@/navigation';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </React.StrictMode>,
);
