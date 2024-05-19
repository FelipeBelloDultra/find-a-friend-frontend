import { BrowserRouter } from "react-router-dom";

import { HttpAxiosAdapter } from "~/infra/http/adapters/http-axios-adapter";
import { Router } from "~/router";
import { AuthenticationContext } from "~/modules/authentication/contexts";
import { HttpContext } from "~/modules/shared/contexts";
import { ToastContainer } from "~/modules/shared/components";

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
