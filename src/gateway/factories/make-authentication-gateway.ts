import { HttpClient } from "~/infra/http/http-client";

import { HttpAuthenticationGateway } from "../http/http-authentication-gateway";

export function makeAuthenticationGateway() {
  const httpClient = new HttpClient();
  const httpAuthenticationGateway = new HttpAuthenticationGateway(httpClient);

  return httpAuthenticationGateway;
}
