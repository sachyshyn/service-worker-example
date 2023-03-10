import { RouterProvider } from '@shared/lib';

import { router } from '@pages/router';

export function withRouter() {
  return <RouterProvider router={router} />;
}
