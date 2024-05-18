import { BrowserRouter } from "react-router-dom";

import { HttpAxiosAdapter } from "~/infra/http/adapters/http-axios-adapter";
import { Router } from "~/router/router";
import { ToastContainer } from "~/components/ui/toast/toast-container";
import { HttpContext } from "~/contexts/http-context";
import { AuthContext } from "~/contexts/auth-context";
import { OrganizationContext } from "~/contexts/organization-context";

export function App() {
  return (
    <BrowserRouter>
      <HttpContext httpClient={new HttpAxiosAdapter()}>
        <AuthContext>
          <OrganizationContext>
            <Router />

            <ToastContainer />
          </OrganizationContext>
        </AuthContext>
      </HttpContext>
    </BrowserRouter>
  );
}
