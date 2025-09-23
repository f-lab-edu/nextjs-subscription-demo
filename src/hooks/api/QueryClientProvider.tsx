'use client';

import { PropsWithChildren } from 'react';
import { QueryClientProvider as Provider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      throwOnError: true,
    },
  },
});

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return <Provider client={queryClient}>{children}</Provider>;
}
