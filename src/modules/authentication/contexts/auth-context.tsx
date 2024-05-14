import { createContext } from "react";

import type { ReactNode } from "react";
import type { AuthGateway } from "../gateway/auth-gateway";

interface AuthContextProps {
  children: ReactNode;
  authGateway: AuthGateway;
}

interface AuthContextProviderData {
  authGateway: AuthGateway;
}

export const AuthContextProvider = createContext({} as AuthContextProviderData);

export function AuthContext({ authGateway, children }: AuthContextProps) {
  return (
    <AuthContextProvider.Provider value={{ authGateway }}>{children}</AuthContextProvider.Provider>
  );
}
