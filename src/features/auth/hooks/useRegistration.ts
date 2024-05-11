import { useCallback } from 'react';

import { usePromise } from '@/hooks';
import { register } from '@/lib/auth';
import {
  finishRegistrationProcess,
  startRegistrationProcess,
} from '@/services/auth';

const useRegistration = (onSuccess: (token: string, email: string) => void) => {
  const registerChain = useCallback(
    (email: string) =>
      startRegistrationProcess({ email }).then(({ options, token }) =>
        register(options)
          .then(attestation =>
            finishRegistrationProcess({ attestation, token }),
          )
          .then(({ token, email }) => onSuccess(token, email)),
      ),
    [onSuccess],
  );

  const [start, state] = usePromise(registerChain);

  return [start, state] as const;
};

export default useRegistration;
