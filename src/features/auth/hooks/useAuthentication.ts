import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth';
import { PATHS } from '@/navigation';

import useLogging from './useLogging';
import useRegistration from './useRegistration';

const useAuthentication = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSuccess = useCallback(
    (token: string, email: string) => {
      setUser({ token, email });

      navigate(PATHS.DASHBOARD);
    },
    [setUser, navigate],
  );

  const [login] = useLogging(onSuccess);
  const [register] = useRegistration(onSuccess);

  return { login, register };
};

export default useAuthentication;
