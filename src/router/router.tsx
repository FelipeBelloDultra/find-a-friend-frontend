import { Navigate, Route, Routes } from "react-router-dom";

import { SignIn } from "~/pages/sign-in";
import { SignUp } from "~/pages/sign-up";

import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "./constants";

export function Router() {
  return (
    <Routes>
      <Route
        path={SIGN_IN_ROUTE}
        element={<SignIn />}
      />
      <Route
        path={SIGN_UP_ROUTE}
        element={<SignUp />}
      />

      <Route
        path="*"
        element={<Navigate to={SIGN_IN_ROUTE} />}
      />
    </Routes>
  );
}
