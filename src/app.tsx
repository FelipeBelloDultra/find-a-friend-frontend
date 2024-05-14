import { BrowserRouter } from "react-router-dom";

import { Router } from "./router/router";
import { AuthContext } from "./contexts/auth-context";
import { makeAuthenticationGateway } from "./gateway/factories/make-authentication-gateway";

const authenticationGateway = makeAuthenticationGateway();

function App() {
  return (
    <BrowserRouter>
      <AuthContext authenticationGateway={authenticationGateway}>
        <Router />
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
