import { BrowserRouter } from "react-router-dom";

import { HttpAxiosAdapter } from "./infra/http/adapters/http-axios-adapter";
import { Router } from "./router/router";
import { ToastContainer } from "./components/ui/toast/toast-container";
import { OrganizationContext } from "./modules/organization/contexts/organization-context";
import { AuthContext } from "./modules/authentication/contexts/auth-context";
import { HttpContext } from "./contexts/http-context";

function App() {
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

export default App;
