import { createBrowserRouter, Navigate } from 'react-router';
import HomePage from './routes/home-page';
import UseSuspensePage from './routes/use-suspense-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/demo/use-suspense',
    element: <Navigate to="/demo/use-suspense/basic" replace />,
  },
  {
    path: '/demo/use-suspense/:caseSlug',
    element: <UseSuspensePage />,
  },
]);
