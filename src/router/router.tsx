import { Navigate, Route, Routes } from "react-router-dom";

import { Home, SignIn, SignUp } from "~/screens";
import { AuthorizedLayout, UnauthorizedLayout } from "~/layouts";
import { useAuthenticationStore } from "~/modules/authentication/store";

import { ROUTES } from "./constants";

export function Router() {
  const { token } = useAuthenticationStore();
  return (
    <Routes>
      <Route element={<UnauthorizedLayout />}>
        <Route
          path={ROUTES.friends.path}
          element={<Home />}
        />
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
          element={<div>{token}</div>}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to={ROUTES.friends.path} />}
      />
    </Routes>
  );
}
