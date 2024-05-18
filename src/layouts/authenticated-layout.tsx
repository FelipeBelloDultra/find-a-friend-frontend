import { Outlet } from "react-router-dom";

export function AuthenticatedLayout() {
  return (
    <div>
      FOI
      <Outlet />
    </div>
  );
}
