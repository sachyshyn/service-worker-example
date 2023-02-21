import type { PropsWithChildren } from '@shared/lib';

export type PostImage = {
  id: number | string;
  thumbnailUrl: string;
  title: string;
  url: string;
};

export type Post = {
  id: number | string;
  title: string;
  body: string;
  image: PostImage;
};

export type PostPropsType = PropsWithChildren<{ post: Post }>;
