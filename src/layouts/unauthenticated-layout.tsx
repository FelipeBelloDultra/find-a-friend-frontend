import { Navigate, Outlet } from "react-router-dom";

import { DASHBOARD_ROUTE } from "~/router/constants";

export function UnauthenticatedLayout() {
  const token = sessionStorage.getItem("token");

  if (token) {
    return (
      <Navigate
        to={DASHBOARD_ROUTE}
        replace
      />
    );
  }

  return <Outlet />;
}
