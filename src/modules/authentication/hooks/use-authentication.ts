import { useContext } from "react";

import { AuthenticateContextProvider } from "../contexts/authentication-context";

export function useAuthentication() {
  const authContext = useContext(AuthenticateContextProvider);

  if (!Object.keys(authContext).length) {
    throw new Error("useAuthentication must be used within an AuthenticateContextProvider");
  }

  return authContext;
}
