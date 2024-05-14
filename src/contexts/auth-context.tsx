import { createContext } from "react";

import type { ReactNode } from "react";
import type { AuthenticationGateway } from "~/gateway/authentication-gateway";

interface AuthContextProps {
  children: ReactNode;
  authenticationGateway: AuthenticationGateway;
}

interface AuthContextProviderData {
  authenticationGateway: AuthenticationGateway;
}

export const AuthContextProvider = createContext({} as AuthContextProviderData);

export function AuthContext({ authenticationGateway, children }: AuthContextProps) {
  return (
    <AuthContextProvider.Provider value={{ authenticationGateway }}>
      {children}
    </AuthContextProvider.Provider>
  );
}
