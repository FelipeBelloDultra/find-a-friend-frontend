import { createContext } from "react";

import type { ReactNode } from "react";
import type { OrganizationGateway } from "../gateway/org-gateway";

interface OrganizationContextProps {
  children: ReactNode;
  organizationGateway: OrganizationGateway;
}

interface OrganizationContextProviderData {
  organizationGateway: OrganizationGateway;
}

export const OrganizationContextProvider = createContext({} as OrganizationContextProviderData);

export function OrganizationContext({ organizationGateway, children }: OrganizationContextProps) {
  return (
    <OrganizationContextProvider.Provider value={{ organizationGateway }}>
      {children}
    </OrganizationContextProvider.Provider>
  );
}
