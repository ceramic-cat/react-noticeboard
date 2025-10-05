import type { RouteObject } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider }
  from 'react-router-dom';
import '../sass/index.scss';
import routes from './routes';
import App from './App';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const protectedRoutes = routes.map(route => {
  if (route.requiresAuth) {
    return { ...route, element: <ProtectedRoute>{route.element}</ProtectedRoute> }
  }
  return route
})

// Create a router using settings/content from 'routes.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: protectedRoutes as RouteObject[],
    HydrateFallback: App
  }
]);

// Create the React root element
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);