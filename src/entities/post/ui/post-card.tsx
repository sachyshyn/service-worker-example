import type { PostPropsType } from '../lib';
import { Card, CardContent, CardMedia, Typography, Stack, RouterLink } from '@shared/ui';

export function PostCard(props: PostPropsType) {
  const linkHref = `/posts/${props.post.id}`;

  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center">
          <CardMedia
            sx={{ height: 75, width: 75, mr: 3 }}
            image={props.post.image.thumbnailUrl}
            title={props.post.image.title}
          />
          <Typography variant="h4">
            {import.meta.env.MODE === 'test' ? (
              <a href={linkHref}>{props.post.title}</a>
            ) : (
              <RouterLink to={linkHref}>{props.post.title}</RouterLink>
            )}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
