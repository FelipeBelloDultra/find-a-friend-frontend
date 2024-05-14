import { HttpAuthGateway } from "../gateway/http/http-auth-gateway";

import type { HttpClient } from "~/infra/http/http-client";

export function makeAuthGateway(httpClient: HttpClient) {
  const httpAuthenticationGateway = new HttpAuthGateway(httpClient);

  return httpAuthenticationGateway;
}
