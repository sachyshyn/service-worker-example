import { getRootElement } from '@shared/config';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';

export type { PropsWithChildren, ReactElement } from './types';
export * from './hooks';

export function createRootElement(): Root {
  return createRoot(getRootElement());
}
