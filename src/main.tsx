import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css';
import { RouterProvider } from 'react-router'
import router from './app/router';
import queryClient from './app/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './app/AuthContext';
import { UserProvider } from './app/UserContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
