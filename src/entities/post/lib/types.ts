import type { PropsWithChildren, ID } from '@shared/lib';

export type PostImage = {
  id: ID;
  thumbnailUrl: string;
  title: string;
  url: string;
};

export type Post = {
  id: ID;
  title: string;
  body: string;
  image: PostImage;
};

export type PostPropsType = PropsWithChildren<{ post: Post }>;
