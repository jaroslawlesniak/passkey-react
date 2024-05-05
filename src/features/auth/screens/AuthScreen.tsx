import { Screen } from "@/components/screen";
import LoginForm from "../components/LoginForm";
import { useCallback } from "react";

import { Container } from "../components";

const AuthScreen = () => {
  const register = useCallback(() => {

  }, []);

  const login = useCallback(() => {

  }, []);

  return (
    <Screen>
      <Container>
        <LoginForm onRegister={register} onLogin={login} />
      </Container>
    </Screen>
  );
}

export default AuthScreen
