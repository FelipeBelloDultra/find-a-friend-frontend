import { createContext } from "react";

import type { ReactNode } from "react";
import type { HttpClient } from "~/infra/http/http-client";

interface HttpContextProps {
  children: ReactNode;
  httpClient: HttpClient;
}

interface HttpContextProviderData {
  httpClient: HttpClient;
}

export const HttpContextProvider = createContext({} as HttpContextProviderData);

export function HttpContext({ httpClient, children }: HttpContextProps) {
  return (
    <HttpContextProvider.Provider value={{ httpClient }}>{children}</HttpContextProvider.Provider>
  );
}
