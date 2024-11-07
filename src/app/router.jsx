import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { CreatePost } from './pages/CreatePost';
import { RootLayout } from './pages/RootLayout';
import { PostDetails } from './pages/PostDetails';
import { EditPost } from './pages/EditPost';

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
        path: 'posts/:id',
        element: <PostDetails />,
      },
      {
        path: 'posts/:id/edit',
        element: <EditPost />,
      },
      {
        path: 'submit',
        element: <CreatePost />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
