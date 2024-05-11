import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { ContextValue, User } from './types';

const user: User = {
  token: '',
  email: '',
};

const initial: ContextValue = {
  user,
  setUser: () => {},
};

const AuthContext = createContext<ContextValue>(initial);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(initial.user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  return { user, setUser };
};

export default AuthProvider;
