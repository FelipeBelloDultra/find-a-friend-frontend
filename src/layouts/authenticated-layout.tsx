import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "~/modules/authentication/hooks/use-auth";

export function AuthenticatedLayout() {
  const { showAuthenticated, logout } = useAuth();

  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    loaded.current = true;

    showAuthenticated().catch(() => {
      logout();
    });
  }, [logout, showAuthenticated]);

  if (loaded.current) {
    return (
      <div>
        FOI
        <Outlet />
      </div>
    );
  }
}
