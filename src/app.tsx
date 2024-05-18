import { BrowserRouter } from "react-router-dom";

import { Router } from "./router/router";
import { AuthContext } from "./modules/authentication/contexts/auth-context";
import { makeAuthGateway } from "./modules/authentication/factories/make-auth-gateway";
import { HttpAxiosAdapter } from "./infra/http/adapters/http-axios-adapter";
import { ToastContainer } from "./components/ui/toast/toast-container";
import { makeOrganizationGateway } from "./modules/organization/factories/make-organization-gateway";
import { OrganizationContext } from "./modules/organization/contexts/organization-context";

const httpClient = new HttpAxiosAdapter();

const authenticationGateway = makeAuthGateway(httpClient);
const organizationGateway = makeOrganizationGateway(httpClient);

function App() {
  return (
    <BrowserRouter>
      <AuthContext authGateway={authenticationGateway}>
        <OrganizationContext organizationGateway={organizationGateway}>
          <Router />

          <ToastContainer />
        </OrganizationContext>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
