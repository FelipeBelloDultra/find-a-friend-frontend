import { create } from "zustand";

interface AuthenticationStoreState {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
}

export const useAuthenticationStore = create<AuthenticationStoreState>()((set) => ({
  token: undefined,
  setToken: (newToken) =>
    set(() => ({
      token: newToken,
    })),
}));
