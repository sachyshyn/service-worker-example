import { createBrowserRouter } from '@shared/lib';
import { MainPage } from './main';
import { PostPage } from './post';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/posts/:id',
    element: <PostPage />
  }
]);
