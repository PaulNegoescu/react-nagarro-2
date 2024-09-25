import { createContext, type ReactNode, useContext } from "react";
import type { AuthValue, ContextValue } from './AuthTypes';
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const initialValue: AuthValue = {
  user: null,
  accessToken: null,
}

export const AuthContext = createContext<ContextValue | null>(null);

export function AuthContextProvider({children}: {children: ReactNode}) {
  const [auth, setAuth] = useLocalStorageState('auth', initialValue);

  function login(data: AuthValue) {
    setAuth(data);
  }

  function logout() {
    setAuth(initialValue);
  }

  return (
    <AuthContext.Provider value={{...auth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuthContext should always be used in a descendant of the AuthContextProvider component.');
  }
  return ctx;
}
