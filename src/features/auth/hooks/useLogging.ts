import { usePromise } from '@/hooks'
import { authenticate } from '@/lib/auth';
import { finishLoginProcess, startLoginProcess } from '@/services/auth';
import { useCallback } from 'react';

const useLogging = (onSuccess: (token: string) => void) => {
  const loginChain = useCallback((email: string) =>
    startLoginProcess({ email })
      .then(({ options, token }) => authenticate(options).then(assertion => finishLoginProcess({ assertion, token }))
        .then(({ token }) => onSuccess(token))
      ), [onSuccess]);

  const [start, state] = usePromise(loginChain);

  return [start, state] as const;
}

export default useLogging