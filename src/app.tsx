import { BrowserRouter } from "react-router-dom";

import { Router } from "./router/router";
import { AuthContext } from "./modules/authentication/contexts/auth-context";
import { makeAuthGateway } from "./modules/authentication/factories/make-auth-gateway";
import { HttpFetchAdapter } from "./infra/http/adapters/http-fetch-adapter";

const httpClient = new HttpFetchAdapter();
const authenticationGateway = makeAuthGateway(httpClient);

function App() {
  return (
    <BrowserRouter>
      <AuthContext authGateway={authenticationGateway}>
        <Router />
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
