import { useCallback, useEffect, useRef, useState } from 'react';

interface QueryState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

/**
 * Minimal data-fetching hook: handles loading/error state, cancels in-flight
 * requests on unmount or dependency change, and exposes a manual retry.
 */
export function useApiQuery<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[],
  options: { enabled?: boolean } = {},
) {
  const enabled = options.enabled ?? true;
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    isLoading: enabled,
  });
  const [attempt, setAttempt] = useState(0);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, error: null, isLoading: false });
      return;
    }

    const controller = new AbortController();
    let active = true;
    setState((previous) => ({ ...previous, isLoading: true, error: null }));

    fetcherRef
      .current(controller.signal)
      .then((data) => {
        if (active) setState({ data, error: null, isLoading: false });
      })
      .catch((error: unknown) => {
        if (!active || (error instanceof DOMException && error.name === 'AbortError')) return;
        setState({
          data: null,
          error: error instanceof Error ? error : new Error('Unexpected error'),
          isLoading: false,
        });
      });

    return () => {
      active = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return { ...state, retry };
}
