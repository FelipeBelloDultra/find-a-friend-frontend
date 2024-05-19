import { createContext, useCallback, useLayoutEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "~/router/constants";
import { useOrganizationStore } from "~/modules/organization/store";
import { useHttp } from "~/modules/shared/hooks";
import { UnauthorizedError, UnauthorizedRefreshTokenError } from "~/infra/http/errors";
import { AuthStorageAdapter } from "~/infra/storage/auth-storage-adapter";

import { useAuthenticationStore } from "../store";

import type { DomainOrganization } from "~/modules/organization/mappers";
import type { AuthenticateProps, AuthenticationGateway } from "../gateways";
import type { ReactNode } from "react";

interface AuthenticationContextProps {
  children: ReactNode;
}

interface AuthenticationContextProviderData {
  authenticationGateway: AuthenticationGateway;
  savedToken: string | null;
  authenticate: (data: AuthenticateProps) => Promise<void>;
  logout: () => void;
  showAuthenticated: () => Promise<void>;
}

export const AuthenticateContextProvider = createContext({} as AuthenticationContextProviderData);

export function AuthenticationContext({ children }: AuthenticationContextProps) {
  const { token, setToken } = useAuthenticationStore();
  const { authenticationGateway, httpClient } = useHttp();
  const { setOrganization } = useOrganizationStore();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setToken(undefined);
    setOrganization({} as DomainOrganization);
    AuthStorageAdapter.clear();
    navigate(ROUTES.signIn.path, { replace: true });
  }, [setToken, navigate, setOrganization]);

  const savedToken = useMemo(() => {
    return token || AuthStorageAdapter.getSessionToken();
  }, [token]);

  const refreshTokenOnUnauthorizedError = useCallback(
    async (error: unknown) => {
      if (error instanceof UnauthorizedRefreshTokenError) {
        logout();
        return Promise.reject(error);
      }

      if (error instanceof UnauthorizedError && error.requestConfig) {
        if (!savedToken) {
          logout();
          return Promise.reject(error);
        }

        const newToken = await authenticationGateway.refreshToken();
        AuthStorageAdapter.updateSessionToken(newToken);
        setToken(newToken);
        httpClient.setBearerToken(newToken);

        if (error.requestConfig.headers) {
          error.requestConfig.headers["Authorization"] = `Bearer ${newToken}`;
        }

        return httpClient.instance(error.requestConfig);
      }

      return Promise.reject(error);
    },
    [authenticationGateway, httpClient, logout, savedToken, setToken],
  );

  useLayoutEffect(() => {
    const interceptorId = httpClient.addResponseInterceptor({
      onFulfilled: (response) => response,
      onRejected: refreshTokenOnUnauthorizedError,
    });

    return () => {
      httpClient.removeResponseInterceptor(interceptorId);
    };
  }, [httpClient, refreshTokenOnUnauthorizedError]);

  const showAuthenticated = useCallback(async () => {
    const token = savedToken || "";

    setToken(token);
    httpClient.setBearerToken(token);

    const organization = await authenticationGateway.me();

    setOrganization(organization);
  }, [httpClient, authenticationGateway, setOrganization, setToken, savedToken]);

  const authenticate = useCallback(
    async (data: AuthenticateProps) => {
      const token = await authenticationGateway.authenticate(data);

      setToken(token);
      AuthStorageAdapter.updateSessionToken(token);
      navigate(ROUTES.dashboard.path, { replace: true });
    },
    [authenticationGateway, setToken, navigate],
  );

  return (
    <AuthenticateContextProvider.Provider
      value={{
        authenticationGateway,
        savedToken,
        authenticate,
        logout,
        showAuthenticated,
      }}
    >
      {children}
    </AuthenticateContextProvider.Provider>
  );
}
