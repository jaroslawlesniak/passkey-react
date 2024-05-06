export type User = {
  token: string;
  email?: string;
};

export type ContextValue = {
  user: User;
  setUser: (user: User) => void;
};
