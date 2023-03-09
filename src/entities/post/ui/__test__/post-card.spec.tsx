import { beforeEach, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { generatePostStub } from './stubs';
import { Post } from '@entities/post/lib';
import { PostCard } from '../post-card';

describe('PostCard', () => {
  let post: Post;

  beforeEach(() => {
    post = generatePostStub();
    render(<PostCard post={post} />);
  });

  describe('render', () => {
    test('should render post image', async () => {
      const postImageTitle = post.image.title;

      const imageNode = screen.getByTitle(postImageTitle);

      expect(imageNode).toBeInTheDocument();
    });

    test('should render post title', async () => {
      const postTitle = post.title;

      const textNode = screen.getByText(postTitle);

      expect(textNode).toBeInTheDocument();
    });
  });
});
