import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "~/pages/home";

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );
}
