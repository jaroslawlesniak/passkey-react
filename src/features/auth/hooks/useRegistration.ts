import { usePromise } from '@/hooks'
import { register } from '@/lib/auth';
import { finishRegistrationProcess, startRegistrationProcess } from '@/services/auth';
import { useCallback } from 'react';

const useRegistration = (onSuccess: (token: string) => void) => {
  const registerChain = useCallback((email: string) =>
    startRegistrationProcess({ email })
      .then(({ options, token }) => register(options).then(attestation => finishRegistrationProcess({ attestation, token }))
        .then(({ token }) => onSuccess(token))
      ), [onSuccess]);

  const [start, state] = usePromise(registerChain);

  return [start, state] as const;
}

export default useRegistration