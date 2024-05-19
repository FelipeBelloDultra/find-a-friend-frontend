import { createContext } from "react";

import { HttpAuthenticationGateway } from "~/modules/authentication/gateways";
import { HttpOrganizationGateway } from "~/modules/organization/gateways";

import type { ReactNode } from "react";
import type { OrganizationGateway } from "~/modules/organization/gateways";
import type { AuthenticationGateway } from "~/modules/authentication/gateways";
import type { HttpClient } from "~/infra/http/http-client";

interface HttpContextProps {
  children: ReactNode;
  httpClient: HttpClient;
}

interface HttpContextProviderData {
  httpClient: HttpClient;
  authenticationGateway: AuthenticationGateway;
  organizationGateway: OrganizationGateway;
}

export const HttpContextProvider = createContext({} as HttpContextProviderData);

export function HttpContext({ httpClient, children }: HttpContextProps) {
  return (
    <HttpContextProvider.Provider
      value={{
        httpClient,
        authenticationGateway: new HttpAuthenticationGateway(httpClient),
        organizationGateway: new HttpOrganizationGateway(httpClient),
      }}
    >
      {children}
    </HttpContextProvider.Provider>
  );
}
