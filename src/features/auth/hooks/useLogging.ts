import { useCallback } from 'react';

import { usePromise } from '@/hooks'
import { login } from '@/lib/auth';
import { finishLoginProcess, startLoginProcess } from '@/services/auth';

const useLogging = (onSuccess: (token: string, email: string) => void) => {
  const loginChain = useCallback((email: string) =>
    startLoginProcess({ email })
      .then(({ options, token }) => login(options).then(assertion => finishLoginProcess({ assertion, token }))
        .then(({ token, email }) => onSuccess(token, email))
      ), [onSuccess]);

  const [start, state] = usePromise(loginChain);

  return [start, state] as const;
}

export default useLogging