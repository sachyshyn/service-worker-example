import type { PostPropsType } from '../lib';
import { Box, Stack, Typography } from '@shared/ui';

export function PostContent(props: PostPropsType) {
  return (
    <Box>
      <Stack spacing={2}>
        <img loading="lazy" src={props.post.image.thumbnailUrl} alt={props.post.image.title} />
        <Typography variant="h1">{props.post.title}</Typography>
        <Typography>{props.post.body}</Typography>
      </Stack>
    </Box>
  );
}
