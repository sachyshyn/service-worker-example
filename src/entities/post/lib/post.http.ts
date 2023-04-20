import { httpService } from '@shared/api';
import { LIMIT, OFFSET } from '@shared/config';
import { DEFAULT_LIMIT, ID } from '@shared/lib';
import { Post, PostImage } from './types';

const postsCache = new Map<number, Post[]>();

export const postHttp = {
  getMany: async (payload: { offset: number } = { offset: 0 }): Promise<Post[]> => {
    if (postsCache.has(payload.offset)) {
      return postsCache.get(payload.offset) as Post[];
    }

    const postPayload = {
      params: {
        [LIMIT]: DEFAULT_LIMIT,
        [OFFSET]: payload.offset
      }
    };

    const [{ data: posts }, { data: photos }] = await Promise.all([
      httpService.get<Omit<Post, 'image'>[]>('posts', postPayload),
      httpService.get<PostImage[]>('photos', postPayload)
    ]);

    const mapper = posts.map<Post>((post, index) => ({
      title: post.title,
      id: post.id,
      body: post.body,
      image: photos[index]
    }));

    postsCache.set(payload.offset, mapper);

    return mapper;
  },

  getOneById: async (id: ID): Promise<Post> => {
    const [{ data: post }, { data: image }] = await Promise.all([
      httpService.get<Omit<Post, 'image'>>(`posts/${id}`),
      httpService.get<PostImage>(`photos/${id}`)
    ]);

    return { ...post, image };
  }
};
