import { getMockConfig } from './mockConfig';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

/**
 * Thin transport used by every marketplace API call.
 * Today it resolves against the in-memory mock backend; swapping to a real
 * service only means replacing the body of this function with `fetch`.
 */
export async function request<T>(
  endpoint: string,
  resolver: () => T,
  options: { signal?: AbortSignal; failureMessage: string } = {
    failureMessage: 'Something went wrong',
  },
): Promise<T> {
  const { latencyMs, failing } = getMockConfig();
  await delay(latencyMs, options.signal);

  if (failing.includes(endpoint)) {
    throw new ApiError(options.failureMessage, 503, endpoint);
  }

  return resolver();
}
