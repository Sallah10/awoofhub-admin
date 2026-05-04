process.env.NEXT_PUBLIC_API_URL = 'http://localhost';

import { QueryClient } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './testing/mocks/node';

const queryClient = new QueryClient()

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => server.close());

afterEach(async () => {
  queryClient.clear();
  server.resetHandlers();
});