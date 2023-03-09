import { postHttp, PostCard } from '@entities/post';
import type { Post } from '@entities/post';
import { useEffect, useState } from '@shared/lib';
import { Container, Grid, Typography } from '@shared/ui';

export function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedPosts = await postHttp.getMany();

      setPosts(fetchedPosts);
    })();
  }, []);

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3, mt: 3 }}>
        News Simple App
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item sx={{ width: '100%' }} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
