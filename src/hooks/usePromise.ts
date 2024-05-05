import { useCallback, useState } from 'react'

const usePromise = <T,Q>(action: (args: T) => Promise<Q>) => {
  const [loading, setLoading] = useState(false);

  const start = useCallback(async (args: T): Promise<Q> => {
    setLoading(true)

    return action(args).finally(() => setLoading(false));
  }, [action, setLoading]);

  return [start, { loading }] as const;
}

export default usePromise