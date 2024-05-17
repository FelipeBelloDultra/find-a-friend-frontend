import { create } from "zustand";

import type { DomainOrg } from "../mappers/org-mapper";

interface OrghStoreState {
  organization: DomainOrg;
  setOrganization: (organization: DomainOrg) => void;
}

export const useOrghStore = create<OrghStoreState>()((set) => ({
  organization: {} as DomainOrg,
  setOrganization: (organization) =>
    set(() => ({
      organization,
    })),
}));
