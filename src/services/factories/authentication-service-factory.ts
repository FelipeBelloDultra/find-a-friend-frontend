import { HttpClient } from "~/infra/http/http-client";

import { AuthenticationService } from "../authentication-service";

export function makeAuthenticationService() {
  const httpClient = new HttpClient();
  const authenticationService = new AuthenticationService(httpClient);

  return authenticationService;
}
