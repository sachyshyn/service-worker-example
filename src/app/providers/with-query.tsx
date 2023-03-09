import { QueryClientProvider } from '@shared/lib';
import { queryClient } from '@shared/api';
import type { ReactElement } from '@shared/lib';

export function withQuery(Component: () => ReactElement | null) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
}
