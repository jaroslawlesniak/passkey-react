import { useAuth } from '@/contexts/auth'
import { Navigate } from 'react-router-dom';
import { PATHS } from '@/navigation/paths';

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <Navigate to={user.token ? PATHS.DASHBOARD : PATHS.AUTH} />
  )
};

export default HomeScreen;
