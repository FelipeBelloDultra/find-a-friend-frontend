import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import { useAuthentication } from "~/modules/authentication/hooks";

export function AuthorizedLayout() {
  const { showAuthenticated } = useAuthentication();
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    showAuthenticated();
  }, [showAuthenticated]);

  if (loaded.current) {
    return <Outlet />;
  }
}
