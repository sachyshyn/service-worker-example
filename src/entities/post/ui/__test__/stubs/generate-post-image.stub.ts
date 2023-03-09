import { Post } from '../../../lib';

export function generatePostImageStub(id: Post['image']['id']): Post['image'] {
  return {
    id,
    thumbnailUrl: `image ${id} thumbnail url`,
    title: `image ${id} title`,
    url: `image ${id} url`
  };
}
