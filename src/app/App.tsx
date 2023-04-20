import { RouterProvider } from '@shared/lib';
import { router } from '@pages/router';

export function App() {
  return <RouterProvider router={router} />;
}
