import { Navigate, Route, Routes } from "react-router-dom";

import { SignIn, SignUp } from "~/screens";
import { AuthorizedLayout, UnauthorizedLayout } from "~/layouts";

import { ROUTES } from "./constants";

export function Router() {
  return (
    <Routes>
      <Route element={<UnauthorizedLayout />}>
        <Route
          path={ROUTES.signIn.path}
          element={<SignIn />}
        />
        <Route
          path={ROUTES.signUp.path}
          element={<SignUp />}
        />
      </Route>

      <Route element={<AuthorizedLayout />}>
        <Route
          path={ROUTES.dashboard.path}
          element={<div />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to={ROUTES.signIn.path} />}
      />
    </Routes>
  );
}
