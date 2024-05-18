import { create } from "zustand";

import type { DomainOrg } from "../mappers/org-mapper";

interface OrgStoreState {
  organization: DomainOrg;
  setOrganization: (organization: DomainOrg) => void;
}

export const useOrgStore = create<OrgStoreState>()((set) => ({
  organization: {} as DomainOrg,
  setOrganization: (organization) =>
    set(() => ({
      organization,
    })),
}));
