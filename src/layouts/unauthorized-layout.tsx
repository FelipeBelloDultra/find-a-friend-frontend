import { Navigate, Outlet } from "react-router-dom";

import { useAuthentication } from "~/modules/authentication/hooks";
import { ROUTES } from "~/router/constants";

export function UnauthorizedLayout() {
  const { savedToken } = useAuthentication();

  if (savedToken) {
    return (
      <Navigate
        to={ROUTES.dashboard.path}
        replace
      />
    );
  }

  return <Outlet />;
}
