import { createContext, useMemo } from "react";

import { useHttp } from "~/hooks/use-http";
import { HttpOrgGateway } from "~/gateway/org/http/http-org-gateway";

import type { ReactNode } from "react";
import type { OrganizationGateway } from "~/gateway/org/org-gateway";

interface OrganizationContextProps {
  children: ReactNode;
}

interface OrganizationContextProviderData {
  organizationGateway: OrganizationGateway;
}

export const OrganizationContextProvider = createContext({} as OrganizationContextProviderData);

export function OrganizationContext({ children }: OrganizationContextProps) {
  const { httpClient } = useHttp();

  const organizationGateway = useMemo(() => new HttpOrgGateway(httpClient), [httpClient]);

  return (
    <OrganizationContextProvider.Provider value={{ organizationGateway }}>
      {children}
    </OrganizationContextProvider.Provider>
  );
}
