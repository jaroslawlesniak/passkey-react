import { useCallback, useState } from 'react'

const usePromise = <T,Q>(action: (args: T) => Promise<Q>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Q | undefined>(undefined);

  const start = useCallback((args: T) => {
    setLoading(true)

    action(args)
      .then(payload => setData(payload))
      .finally(() => setLoading(false));
  }, []);

  return [start, { loading, data }] as const;
}

export default usePromise