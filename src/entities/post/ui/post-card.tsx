import type { PostPropsType } from '../lib';

export function PostCard(props: PostPropsType) {
  return (
    <section>
      <img src={props.post.image.thumbnailUrl} alt={props.post.image.title} />
      <h3>{props.post.title}</h3>
      <p>{props.post.body}</p>
    </section>
  );
}
