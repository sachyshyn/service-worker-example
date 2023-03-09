import { beforeEach, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { generatePostStub } from './stubs';
import { Post } from '@entities/post/lib';
import { PostContent } from '../post-content';

describe('PostContent', () => {
  let post: Post;

  beforeEach(() => {
    post = generatePostStub();
    render(<PostContent post={post} />);
  });

  describe('render', () => {
    test('should render post image', async () => {
      const postImageAltText = post.image.title;

      const imageNode = screen.getByAltText(postImageAltText);

      expect(imageNode).toBeInTheDocument();
    });

    test('should render post title', async () => {
      const postTitle = post.title;

      const textNode = screen.getByText(postTitle);

      expect(textNode).toBeInTheDocument();
    });

    test('should render post content', async () => {
      const postContent = post.body;

      const postContentTextNode = screen.getByText(postContent);

      expect(postContentTextNode).toBeInTheDocument();
    });
  });
});
