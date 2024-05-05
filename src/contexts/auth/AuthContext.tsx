import React, { PropsWithChildren, createContext, useContext, useState } from 'react'
import { ContextValue } from './types';

const initial: ContextValue = {
  user: {
    token: '',
  },
  setUser: () => {},
};

const AuthContext = createContext<ContextValue>(initial);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState({ token: '' });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  return { user, setUser };
}

export default AuthProvider;
