import { createContext } from "react";

import { HttpAuthGateway } from "~/gateway/auth/http/http-auth-gateway";
import { HttpOrgGateway } from "~/gateway/org/http/http-org-gateway";

import type { OrganizationGateway } from "~/gateway/org/org-gateway";
import type { AuthGateway } from "~/gateway/auth/auth-gateway";
import type { ReactNode } from "react";
import type { HttpClient } from "~/infra/http/http-client";

interface HttpContextProps {
  children: ReactNode;
  httpClient: HttpClient;
}

interface HttpContextProviderData {
  httpClient: HttpClient;
  authGateway: AuthGateway;
  organizationGateway: OrganizationGateway;
}

export const HttpContextProvider = createContext({} as HttpContextProviderData);

export function HttpContext({ httpClient, children }: HttpContextProps) {
  return (
    <HttpContextProvider.Provider
      value={{
        httpClient,
        authGateway: new HttpAuthGateway(httpClient),
        organizationGateway: new HttpOrgGateway(httpClient),
      }}
    >
      {children}
    </HttpContextProvider.Provider>
  );
}
