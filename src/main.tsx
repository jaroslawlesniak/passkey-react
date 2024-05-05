import React from 'react'
import ReactDOM from 'react-dom/client'

import { Navigation } from '@/navigation'
import { AuthProvider } from '@/contexts/auth'

import './styles/index.css'

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </React.StrictMode>,
);
