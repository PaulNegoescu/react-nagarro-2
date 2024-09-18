export interface User {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

export type UserWithoutPassword = Omit<User, 'password'>;

export interface AuthValue {
  user: UserWithoutPassword | null;
  accessToken: string | null;
}

export interface ContextValue extends AuthValue {
  login: (auth: AuthValue) =>  void;
  logout: () => void;
}
