import { Post } from '../../../lib';
import { generatePostImageStub } from './generate-post-image.stub';

export function generatePostStub(): Post {
  const id = Date.now();

  return {
    id,
    body: `post ${id} body`,
    title: `post ${id} title`,
    image: generatePostImageStub(id)
  };
}
