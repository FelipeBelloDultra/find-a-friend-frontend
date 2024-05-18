import { Navigate, Route, Routes } from "react-router-dom";

import { SignIn, SignUp } from "~/modules/authentication/pages";

import { ROUTES } from "./constants";

export function Router() {
  return (
    <Routes>
      <Route
        path={ROUTES.signIn.path}
        element={<SignIn />}
      />
      <Route
        path={ROUTES.signUp.path}
        element={<SignUp />}
      />
      <Route
        path={ROUTES.dashboard.path}
        element={<div />}
      />

      <Route
        path="*"
        element={<Navigate to={ROUTES.signIn.path} />}
      />
    </Routes>
  );
}
