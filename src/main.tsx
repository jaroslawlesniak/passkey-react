import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import Navigation from './Navigation.tsx'
import { AuthProvider } from '@/contexts/auth'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </React.StrictMode>,
);
