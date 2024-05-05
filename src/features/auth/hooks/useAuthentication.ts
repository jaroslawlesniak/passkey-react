import { PATHS } from '@/navigation';
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import useLogging from './useLogging';
import useRegistration from './useRegistration';
import { useAuth } from '@/contexts/auth';

const useAuthentication = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSuccess = useCallback((token: string) => {
    setUser({ token });

    navigate(PATHS.DASHBOARD);
  }, [setUser, navigate]);

  const [login] = useLogging(onSuccess);
  const [register] = useRegistration(onSuccess);

  return { login, register };
}

export default useAuthentication