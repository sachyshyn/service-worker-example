import type { PostPropsType } from '../lib';
import { Card, CardContent, CardMedia, Typography, Stack } from '@shared/ui';

export function PostCard(props: PostPropsType) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center">
          <CardMedia
            sx={{ height: 75, width: 75, mr: 3 }}
            image={props.post.image.thumbnailUrl}
            title={props.post.image.title}
          />
          <Typography variant="h4">{props.post.title}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
