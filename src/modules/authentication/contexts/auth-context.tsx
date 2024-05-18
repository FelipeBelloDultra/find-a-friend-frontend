import { createContext, useCallback, useLayoutEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useOrgStore } from "~/modules/organization/store/org-store";
import { UnauthorizedRefreshTokenError } from "~/infra/http/errors";
import { DASHBOARD_ROUTE, SIGN_IN_ROUTE } from "~/router/constants";
import { useHttp } from "~/hooks/use-http";

import { useAuthStore } from "../store/auth-store";
import { HttpAuthGateway } from "../gateway/http/http-auth-gateway";

import type { ReactNode } from "react";
import type { AuthenticateProps, AuthGateway } from "../gateway/auth-gateway";
import type { DomainOrg } from "~/modules/organization/mappers/org-mapper";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextProviderData {
  authGateway: AuthGateway;
  showAuthenticated: () => Promise<void>;
  authenticate: (data: AuthenticateProps) => Promise<void>;
  logout: () => void;
  isSignedIn: boolean;
}

export const AuthContextProvider = createContext({} as AuthContextProviderData);

export function AuthContext({ children }: AuthContextProps) {
  const { httpClient } = useHttp();
  const { setOrganization, organization } = useOrgStore();
  const { setToken, token } = useAuthStore();
  const navigate = useNavigate();

  const authGateway = useMemo(() => new HttpAuthGateway(httpClient), [httpClient]);

  const logout = useCallback(() => {
    sessionStorage.clear();
    setToken(undefined);
    setOrganization({} as DomainOrg);
    navigate(SIGN_IN_ROUTE, {
      replace: true,
    });
  }, [setToken, setOrganization, navigate]);

  const refreshToken = useCallback(async () => {
    try {
      const newToken = await authGateway.refreshToken();

      setToken(newToken);
    } catch (error) {
      if (error instanceof UnauthorizedRefreshTokenError) {
        logout();
      }
    }
  }, [authGateway, setToken, logout]);

  useLayoutEffect(() => {
    addEventListener("unauthorized", async () => {
      await refreshToken();
    });

    return () => {
      removeEventListener("unauthorized", () => {
        refreshToken();
      });
    };
  }, [refreshToken]);

  const showAuthenticated = useCallback(async () => {
    let token = "";
    if (sessionStorage.getItem("token")) {
      token = sessionStorage.getItem("token") as string;
    }

    const org = await authGateway.me(token);

    setToken(token);
    setOrganization(org);
  }, [authGateway, setOrganization, setToken]);

  const authenticate = useCallback(
    async (data: AuthenticateProps) => {
      const token = await authGateway.authenticate(data);

      setToken(token);
      sessionStorage.setItem("token", token);
      navigate(DASHBOARD_ROUTE, { replace: true });
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
        showAuthenticated,
        logout,
        authenticate,
        isSignedIn,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
}
