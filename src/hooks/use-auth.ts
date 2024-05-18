import { useContext } from "react";

import { AuthContextProvider } from "../contexts/auth-context";

export function useAuth() {
  const authContext = useContext(AuthContextProvider);

  if (!Object.keys(authContext).length) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
}
