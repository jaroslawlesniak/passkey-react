import { Screen } from '@/components/screen';

import { Container } from '../components';
import LoginForm from '../components/LoginForm';
import useAuthentication from '../hooks/useAuthentication';

const AuthScreen = () => {
  const { login, register } = useAuthentication();

  return (
    <Screen>
      <Container>
        <LoginForm onRegister={register} onLogin={login} />
      </Container>
    </Screen>
  );
};

export default AuthScreen;
