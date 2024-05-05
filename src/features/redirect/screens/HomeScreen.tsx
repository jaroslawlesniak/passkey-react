import { useEffect } from 'react';
import { useAuth } from '../../../contexts/auth'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../paths';

const HomeScreen = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.token) {
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(ROUTES.AUTH);
    }
  }, [navigate, user.token]);

  return (
    <></>
  )
}

export default HomeScreen;
