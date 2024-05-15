import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Router } from "./router/router";
import { AuthContext } from "./modules/authentication/contexts/auth-context";
import { makeAuthGateway } from "./modules/authentication/factories/make-auth-gateway";
import { HttpFetchAdapter } from "./infra/http/adapters/http-fetch-adapter";
import { ToastContainer } from "./components/ui/toast/toast-container";

const reactQueryClient = new QueryClient();
const httpClient = new HttpFetchAdapter();
const authenticationGateway = makeAuthGateway(httpClient);

function App() {
  return (
    <BrowserRouter>
      <AuthContext authGateway={authenticationGateway}>
        <QueryClientProvider client={reactQueryClient}>
          <Router />

          <ToastContainer />
        </QueryClientProvider>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
