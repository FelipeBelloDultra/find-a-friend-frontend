import { createContext } from "react";

import type { ReactNode } from "react";
import type { AuthenticationGateway } from "~/gateway/authentication-gateway";

interface AuthContextProps {
  children: ReactNode;
  authGateway: AuthenticationGateway;
}

interface AuthContextProviderData {
  authGateway: AuthenticationGateway;
}

export const AuthContextProvider = createContext({} as AuthContextProviderData);

export function AuthContext({ authGateway, children }: AuthContextProps) {
  return (
    <AuthContextProvider.Provider value={{ authGateway }}>{children}</AuthContextProvider.Provider>
  );
}
