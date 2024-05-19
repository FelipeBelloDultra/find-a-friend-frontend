import { BrowserRouter } from "react-router-dom";

import { HttpAxiosAdapter } from "~/infra/http/adapters/http-axios-adapter";
import { Router } from "~/router/router";
import { AuthenticationContext } from "~/modules/authentication/contexts/authentication-context";
import { HttpContext } from "~/modules/shared/contexts/http-context";
import { ToastContainer } from "~/modules/shared/components/ui/toast";

export function App() {
  return (
    <BrowserRouter>
      <HttpContext httpClient={new HttpAxiosAdapter()}>
        <AuthenticationContext>
          <Router />

          <ToastContainer />
        </AuthenticationContext>
      </HttpContext>
    </BrowserRouter>
  );
}
