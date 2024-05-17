import { HttpAuthGateway } from "../gateway/http/http-org-gateway";

import type { HttpClient } from "~/infra/http/http-client";

export function makeOrganizationGateway(httpClient: HttpClient) {
  const httpAuthGateway = new HttpAuthGateway(httpClient);

  return httpAuthGateway;
}
