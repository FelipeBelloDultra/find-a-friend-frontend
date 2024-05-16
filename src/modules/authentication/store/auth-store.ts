import { create } from "zustand";

interface AuthStoreState {
  token: string | undefined;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStoreState>()((set) => ({
  token: undefined,
  setToken: (newToken) =>
    set(() => ({
      token: newToken,
    })),
}));
