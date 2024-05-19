import { create } from "zustand";

import type { DomainOrganization } from "../mappers";

interface OrganizationStoreState {
  organization: DomainOrganization;
  setOrganization: (organization: DomainOrganization) => void;
}

export const useOrganizationStore = create<OrganizationStoreState>()((set) => ({
  organization: {} as DomainOrganization,
  setOrganization: (organization) =>
    set(() => ({
      organization,
    })),
}));
