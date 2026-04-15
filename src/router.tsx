import { createBrowserRouter } from 'react-router';
import HomePage from './routes/home-page';
import UseSuspensePage from './routes/use-suspense-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/demo/use-suspense',
    element: <UseSuspensePage />,
  },
]);
