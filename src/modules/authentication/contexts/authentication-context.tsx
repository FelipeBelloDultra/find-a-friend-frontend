import { createContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "~/router/constants";
import { useOrganizationStore } from "~/modules/organization/store";
import { useHttp } from "~/modules/shared/hooks";

import { useAuthenticationStore } from "../store";

import type { AuthenticateProps, AuthenticationGateway } from "../gateways";
import type { ReactNode } from "react";

interface AuthenticationContextProps {
  children: ReactNode;
}

interface AuthenticationContextProviderData {
  authenticationGateway: AuthenticationGateway;
  authenticate: (data: AuthenticateProps) => Promise<void>;
  isSignedIn: boolean;
}

export const AuthenticateContextProvider = createContext({} as AuthenticationContextProviderData);

export function AuthenticationContext({ children }: AuthenticationContextProps) {
  const { authenticationGateway } = useHttp();
  const { organization } = useOrganizationStore();
  const { setToken, token } = useAuthenticationStore();
  const navigate = useNavigate();

  const authenticate = useCallback(
    async (data: AuthenticateProps) => {
      const token = await authenticationGateway.authenticate(data);

      setToken(token);
      sessionStorage.setItem("token", token);
      navigate(ROUTES.dashboard.path, { replace: true });
    },
    [authenticationGateway, setToken, navigate],
  );

  const isSignedIn = useMemo(() => {
    return !!token && !!Object.keys(organization).length;
  }, [token, organization]);

  return (
    <AuthenticateContextProvider.Provider
      value={{
        authenticationGateway,
        authenticate,
        isSignedIn,
      }}
    >
      {children}
    </AuthenticateContextProvider.Provider>
  );
}
