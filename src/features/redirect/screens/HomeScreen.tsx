import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth'
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/navigation/paths';

const HomeScreen = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    user.token ? navigate(PATHS.DASHBOARD) : navigate(PATHS.AUTH)
  }, [navigate, user.token]);

  return (
    <></>
  )
};

export default HomeScreen;
