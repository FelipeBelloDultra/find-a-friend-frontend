import { createContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "~/router/constants";
import { useHttp } from "~/hooks/use-http";
import { useOrgStore } from "~/store/org-store";

import { useAuthStore } from "../store/auth-store";

import type { AuthenticateProps, AuthGateway } from "~/gateway/auth/auth-gateway";
import type { ReactNode } from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextProviderData {
  authGateway: AuthGateway;
  authenticate: (data: AuthenticateProps) => Promise<void>;
  isSignedIn: boolean;
}

export const AuthContextProvider = createContext({} as AuthContextProviderData);

export function AuthContext({ children }: AuthContextProps) {
  const { authGateway } = useHttp();
  const { organization } = useOrgStore();
  const { setToken, token } = useAuthStore();
  const navigate = useNavigate();

  const authenticate = useCallback(
    async (data: AuthenticateProps) => {
      const token = await authGateway.authenticate(data);

      setToken(token);
      sessionStorage.setItem("token", token);
      navigate(ROUTES.dashboard.path, { replace: true });
    },
    [authGateway, setToken, navigate],
  );

  const isSignedIn = useMemo(() => {
    return !!token && !!Object.keys(organization).length;
  }, [token, organization]);

  return (
    <AuthContextProvider.Provider
      value={{
        authGateway,
        authenticate,
        isSignedIn,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
}
