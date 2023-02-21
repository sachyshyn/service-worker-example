import type { PostPropsType } from '../lib';

export function PostThumb(props: PostPropsType) {
  return (
    <div>
      <img src={props.post.image.url} alt={props.post.image.title} />
      <h3>{props.post.title}</h3>
    </div>
  );
}
