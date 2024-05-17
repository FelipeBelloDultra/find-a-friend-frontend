import { useContext } from "react";

import { OrganizationContextProvider } from "../contexts/organization-context";

export function useOrganization() {
  const orgContext = useContext(OrganizationContextProvider);

  if (!Object.keys(orgContext).length) {
    throw new Error("useOrganization must be used within an OrganizationContextProvider");
  }

  return orgContext;
}
