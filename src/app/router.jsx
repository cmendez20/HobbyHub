import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { CreatePost } from './pages/CreatePost';
import { RootLayout } from './pages/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'about',
        element: <div>About</div>,
      },
      {
        path: 'createPost',
        element: <CreatePost />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
