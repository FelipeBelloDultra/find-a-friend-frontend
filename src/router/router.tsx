import { Navigate, Route, Routes } from "react-router-dom";

import { SignIn, SignUp } from "~/modules/authentication/pages";
import { AuthenticatedLayout, UnauthenticatedLayout } from "~/layouts";

import { DASHBOARD_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "./constants";

export function Router() {
  return (
    <Routes>
      <Route element={<UnauthenticatedLayout />}>
        <Route
          path={SIGN_IN_ROUTE}
          element={<SignIn />}
        />
        <Route
          path={SIGN_UP_ROUTE}
          element={<SignUp />}
        />
      </Route>

      <Route element={<AuthenticatedLayout />}>
        <Route
          path={DASHBOARD_ROUTE}
          element={<div>estou logadoooooo</div>}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to={SIGN_IN_ROUTE} />}
      />
    </Routes>
  );
}
