import { Navigate, Route, Routes } from "react-router-dom";

import { SignIn, SignUp } from "~/modules/authentication/pages";
import { AuthenticatedLayout, UnauthenticatedLayout } from "~/layouts";

import { ROUTES } from "./constants";

export function Router() {
  return (
    <Routes>
      <Route element={<UnauthenticatedLayout />}>
        <Route
          path={ROUTES.signIn.path}
          element={<SignIn />}
        />
        <Route
          path={ROUTES.signUp.path}
          element={<SignUp />}
        />
      </Route>

      <Route element={<AuthenticatedLayout />}>
        <Route
          path={ROUTES.dashboard.path}
          element={<div>estou logadoooooo</div>}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to={ROUTES.signIn.path} />}
      />
    </Routes>
  );
}
