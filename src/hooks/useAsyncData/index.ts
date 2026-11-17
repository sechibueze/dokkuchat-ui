'use client';

import { useEffect, useRef, useState } from 'react';
import { getErrorMessage } from '@/lib/errors';

export function useAsyncData<T>(fetcher: () => Promise<T>) {
  const fetcherRef = useRef(fetcher);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    fetcherRef
      .current()
      .then((result) => !isCancelled && setData(result))
      .catch((caught) => !isCancelled && setError(getErrorMessage(caught)))
      .finally(() => !isCancelled && setIsLoading(false));
    return () => {
      isCancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}
