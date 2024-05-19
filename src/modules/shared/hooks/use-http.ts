import { useContext } from "react";

import { HttpContextProvider } from "../contexts/http-context";

export function useHttp() {
  const context = useContext(HttpContextProvider);

  if (!Object.keys(context).length) {
    throw new Error("useHttp must be used within an HttpContextProvider");
  }

  return context;
}
