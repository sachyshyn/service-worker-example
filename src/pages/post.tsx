import { useParams } from '@shared/lib';
import { Box, Container, RouterLink, Typography } from '@shared/ui';

export function PostPage() {
  const params = useParams<{ id: string }>();

  return (
    <Container sx={{ mt: 4 }}>
      <Box>
        <RouterLink to="/">Back to list</RouterLink>
      </Box>
      <Typography variant="h1" sx={{ mb: 3, mt: 3 }}>
        Post {params.id}
      </Typography>
    </Container>
  );
}
