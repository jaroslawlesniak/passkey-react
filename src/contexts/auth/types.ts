export type User = {
  token: string;
};

export type ContextValue = {
  user: User;
  setUser: (user: User) => void;
};
